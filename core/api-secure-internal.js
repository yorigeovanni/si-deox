// api-secure.js
import qs from 'qs';
import { RSAKeychain } from 'react-native-rsa-native';
import * as SecureStore from 'expo-secure-store';


function hasProtocol(url) {
  return /^(?:[a-z+]+:)?\/\//i.test(url);
}

function addPrependingSlash(url) {
  return url.charAt(0) !== '/' ? `/${url}` : url;
}

function normalizeUrl(url) {
  return hasProtocol(url) ? url : addPrependingSlash(url);
}

function buildFullUrl(baseURL, rawUrl, config = {}) {
  let finalUrl = hasProtocol(rawUrl)
    ? rawUrl
    : `${baseURL}${normalizeUrl(rawUrl)}`;

  if (config.params) {
    const queryString = qs.stringify(config.params, { encode: false });
    if (queryString) {
      const separator = finalUrl.includes('?') ? '&' : '?';
      finalUrl += `${separator}${queryString}`;
    }
  }
  return finalUrl;
}


async function signData(deviceId, stringToSign) {
  try {
    let padKey = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_SECRET_KEY_NAME);
    console.log('============================== PAD KEY ==============================')
    console.log(padKey);
    console.log('============================== PAD KEY ==============================');
    let signatureBase64 = await RSAKeychain.signWithAlgorithm(stringToSign, padKey, 'SHA256withRSA');
    signatureBase64 = signatureBase64.replace(/(\r\n|\n|\r)/gm, '');
    return signatureBase64;
  } catch (e) {
    console.log(e)
    console.log('Error signing data');
    return null
  }
}







async function applyRequestInterceptor(requestConfig) {
  const { deviceId, jwtAccessToken, method, body } = requestConfig;
  if (deviceId && ['POST', 'PUT', 'PATCH'].includes(method)) {
    const timestamp = Math.floor(Date.now() / 1000);
    let bodyString = '';
    if (typeof body === 'string') {
      bodyString = body;
    } else if (typeof body === 'object') {
      bodyString = JSON.stringify(body);
    }

    const stringToSign = `${timestamp}.${bodyString}`;
    const signature = await signData(deviceId, stringToSign);

    requestConfig.headers = {
      ...requestConfig.headers,
      'X-Signature': signature,
      'X-Timestamp': String(timestamp),
      'X-device-Id': deviceId,
    };
  }

  if (jwtAccessToken) {
    requestConfig.headers = {
      ...requestConfig.headers,
      'Authorization': `Bearer ${jwtAccessToken}`
    };
  }
  return requestConfig;
  //return {method, body, headers: requestConfig.headers};
}





async function applyResponseInterceptor(response, logoutUserInternal) {
  if (!response.ok) {
    const clonedResponse = response.clone();
    let rawText = await clonedResponse.text(); // Baca body satu kali
    let serverData;
    try {
      serverData = JSON.parse(rawText);
    } catch (e) {
      // Jika tidak bisa parse JSON, maka treat sebagai plain text
      serverData = { message: rawText };
    }
    //====================================
    // PENTING - LOGOUT USER JIKA RESPOSE HEADER 401
    // HARAP DIPERHATIKAN UNTUK SEMUA DEVELOPER
    if(response.status === 401) {
      logoutUserInternal()
    }
    //====================================
    throw new Error(
      serverData?.message
        ? `${serverData.message} - ${response.status}`
        : `Request failed with status ${response.status}`
    );
  }
  return response; // Jika ok, kembalikan response apa adanya
}



async function fetchRequest(method, baseURL, url, data, config = {}) {

  const { logoutUserInternal, headers, ...restConfig } = config;
  const finalUrl = buildFullUrl(baseURL, url, restConfig);
  let requestConfig = {
    method: method.toUpperCase(),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (['POST', 'PUT', 'PATCH'].includes(requestConfig.method) && data) {
    requestConfig.body = JSON.stringify(data);
  }
  requestConfig = {
    url: finalUrl,
    ...requestConfig,
    ...restConfig,
  };
  requestConfig = await applyRequestInterceptor(requestConfig);
  let response;
  try {
    response = await fetch(finalUrl, requestConfig);
  } catch (error) {
    console.error('Starting Request Error:', error);
    throw error;
  }

  
  const finalResponse = await applyResponseInterceptor(response, logoutUserInternal);
  try {
    const responseData = await finalResponse.json();
    return {
      data: responseData,
      headers: finalResponse.headers,
      status: finalResponse.status,
      // ... tambahkan jika perlu
    };
  } catch (parseError) {
    console.log('pilooo 2')
    console.error('Response parse error:', parseError);
    throw parseError;
  }
}





const createApi = (defaultOptions = {}) => {
  const baseURL = process.env.NODE_ENV === 'production' ? process.env.EXPO_PUBLIC_API_URL : 'http://10.8.0.2:4002';
  return {
    get: (url, config) =>
      fetchRequest('GET', baseURL, url, null, {
        ...defaultOptions,
        ...config,
      }),
    post: (url, data, config) => {
      return fetchRequest('POST', baseURL, url, data, {
        ...defaultOptions,
        ...config,
      })
    },
    put: (url, data, config) =>
      fetchRequest('PUT', baseURL, url, data, {
        ...defaultOptions,
        ...config,
      }),
    patch: (url, data, config) =>
      fetchRequest('PATCH', baseURL, url, data, {
        ...defaultOptions,
        ...config,
      }),
    del: (url, config) =>
      fetchRequest('DELETE', baseURL, url, null, {
        ...defaultOptions,
        ...config,
      }),
  };
};

export default createApi;
