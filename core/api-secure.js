// api-secure.js
import qs from 'qs';
import { RSAKeychain } from 'react-native-rsa-native';

/**
 * Utility untuk cek apakah URL sudah mengandung http:// atau https://
 */
function hasProtocol(url) {
  return /^(?:[a-z+]+:)?\/\//i.test(url);
}

/**
 * Tambahkan "/" di depan url jika belum ada.
 */
function addPrependingSlash(url) {
  return url.charAt(0) !== '/' ? `/${url}` : url;
}

/**
 * Normalisasi URL
 */
function normalizeUrl(url) {
  return hasProtocol(url) ? url : addPrependingSlash(url);
}

/**
 * Bangun URL penuh (baseURL + url + params)
 * mirip 'paramSerializer' ala axios.
 */
function buildFullUrl(baseURL, rawUrl, config = {}) {
  let finalUrl = hasProtocol(rawUrl)
    ? rawUrl
    : `${baseURL}${normalizeUrl(rawUrl)}`;

  // Jika config.params ada, kita buat query string
  if (config.params) {
    const queryString = qs.stringify(config.params, { encode: false });
    if (queryString) {
      const separator = finalUrl.includes('?') ? '&' : '?';
      finalUrl += `${separator}${queryString}`;
    }
  }

  return finalUrl;
}

/**
 * Fungsi helper untuk menandatangani data (RSA-SHA256).
 * Kembaliannya format Base64.
 * Pastikan Anda sudah meng-install & link 'react-native-rsa-native'.
 */
async function signData(deviceId, stringToSign) {
  try{
    const signatureBase64 = await RSAKeychain.sign(stringToSign, deviceId);
    console.log(signatureBase64);
    return signatureBase64;
  }catch(e){
    console.log(e);
    return null
  }
  
}

/**
 * "Request Interceptor"
 * - Jika config punya 'deviceId', kita buat signature.
 * - Tanda tangan = RSA-SHA256(timestamp + '.' + bodyJSON)
 * - Lalu masukkan di header: X-Signature, X-Timestamp
 */
async function applyRequestInterceptor(requestConfig) {
 // console.log('Request config:', requestConfig);

  const { deviceId, method, body } = requestConfig;

  // Hanya sign pada method POST/PUT/PATCH (bisa Anda sesuaikan)
  if (deviceId && ['POST', 'PUT', 'PATCH'].includes(method)) {
    // Buat timestamp (integer detik)
    const timestamp = Math.floor(Date.now() / 1000);

    // Buat string body => kalau sudah string, gunakan langsung
    // jika belum, jadikan JSON
    let bodyString = '';
    if (typeof body === 'string') {
      bodyString = body;
    } else if (typeof body === 'object') {
      bodyString = JSON.stringify(body);
    }

    // Format stringToSign
    const stringToSign = `${timestamp}.${bodyString}`;

    // Tanda tangani
    const signature = await signData(deviceId, stringToSign);

    // Tambahkan header
    requestConfig.headers = {
      ...requestConfig.headers,
      'X-Signature': signature,
      'X-Timestamp': String(timestamp),
      'X-device-Id': deviceId,
    };
  }

  return requestConfig;
}

/**
 * "Response Interceptor" sederhana
 * - Bisa Anda kembangkan misalnya cek status, lempar error custom, dsb
 */
function applyResponseInterceptor(response, requestConfig) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response;
}

/**
 * Fungsi utama untuk mengeksekusi request fetch
 * - Mirip "axios" style
 */
async function fetchRequest(method, baseURL, url, data, config = {}) {
  const { headers, ...restConfig } = config;
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

  // Jalankan fetch
  console.log(requestConfig)
  let response;
  try {
    response = await fetch(finalUrl, requestConfig);
  } catch (error) {
    console.error('Request Error:', error);
    throw error;
  }

  // Response interceptor
  const finalResponse = applyResponseInterceptor(response, requestConfig);

  // Coba parse JSON
  try {
    const responseData = await finalResponse.json();
    return {
      data: responseData,
      headers: finalResponse.headers,
      status: finalResponse.status,
      // ... tambahkan jika perlu
    };
  } catch (parseError) {
    console.error('Response parse error:', parseError);
    throw parseError;
  }
}

/**
 * "Instance" mirip axios:
 * - Kita definisikan baseURL + method get/put/post/del dsb.
 */
const createApi = (defaultOptions = {}) => {
  // Contoh set baseURL: production vs dev
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.EXPO_PUBLIC_API_URL
      : 'http://10.8.0.2:4002';

  console.log('Using baseURL:', baseURL);

  return {
    get: (url, config) =>
      fetchRequest('GET', baseURL, url, null, {
        ...defaultOptions,
        ...config,
      }),
    post: (url, data, config) =>{
      console.log(data)
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
