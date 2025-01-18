import qs from "qs";

/**
 * Helper untuk menambah "/" di depan URL jika belum ada,
 * kecuali kalau URL sudah mengandung http:// atau https://
 */
const hasProtocol = (url) => /^(?:[a-z+]+:)?\/\//i.test(url);
const addPrependingSlash = (url) => (url.charAt(0) !== "/" ? `/${url}` : url);
const normalizeUrl = (url) => (hasProtocol(url) ? url : addPrependingSlash(url));

/**
 * Kita bisa tiru paramSerializer ala axios.
 * Misal, jika di config kita menyertakan { params: {...} },
 * maka kita convert ke query string.
 */
function buildFullUrl(baseURL, rawUrl, config = {}) {
  let finalUrl = hasProtocol(rawUrl)
    ? rawUrl
    : `${baseURL}${normalizeUrl(rawUrl)}`;

  // Jika ada config.params, kita stringify pakai qs
  if (config.params) {
    const queryString = qs.stringify(config.params, { encode: false });
    // Tambahkan ke finalUrl
    if (queryString) {
      // kalau sudah ada '?', tambahkan '&', dsb.
      const separator = finalUrl.includes("?") ? "&" : "?";
      finalUrl += `${separator}${queryString}`;
    }
  }

  return finalUrl;
}

/**
 * "Interceptors" ala fetch:
 * - applyRequestInterceptor: meniru interceptors.request
 * - applyResponseInterceptor: meniru interceptors.response
 */
async function applyRequestInterceptor(requestConfig) {
  // Di sinilah Anda bisa menambahkan logic "request interceptor"
  // misalnya tambahkan header dinamis, token, dsb.

  // Contoh: console.log request sebelum fetch
  console.log("Request config:", requestConfig);

  // Kembalikan requestConfig yang telah dimodifikasi
  return requestConfig;
}

function applyResponseInterceptor(response, requestConfig) {
  // Di sinilah Anda bisa menambahkan logic "response interceptor"
  // misal men-cek status, melempar error custom, dsb.

  if (!response.ok) {
    // misalnya kita parse error
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response;
}

/**
 * Fungsi utama untuk mengeksekusi request fetch dengan config ala "axios-style"
 */
async function fetchRequest(method, baseURL, url, data, config = {}) {
  const { headers, ...restConfig } = config;

  // Build final URL (gabungkan baseURL + url + params)
  const finalUrl = buildFullUrl(baseURL, url, restConfig);

  // Siapkan requestConfig awal
  let requestConfig = {
    method: method.toUpperCase(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Untuk method POST/PUT/PATCH, isi body
  if (["POST", "PUT", "PATCH"].includes(requestConfig.method) && data) {
    requestConfig.body = JSON.stringify(data);
  }

  // Jalankan "request interceptor"
  requestConfig = await applyRequestInterceptor({
    url: finalUrl,
    ...requestConfig,
  });

  // Eksekusi fetch
  let response;
  try {
    response = await fetch(finalUrl, requestConfig);
  } catch (error) {
    // Error level "request" (mirip axios request error)
    console.error("Request Error:", error);
    throw error;
  }

  // Jalankan "response interceptor"
  const finalResponse = applyResponseInterceptor(response, requestConfig);

  // Coba parse JSON
  // (Jika respons bukan JSON, silakan sesuaikan.)
  try {
    const responseData = await finalResponse.json();
    return {
      data: responseData,
      headers: finalResponse.headers,
      status: finalResponse.status,
      // dsb.
    };
  } catch (parseError) {
    // Kalau JSON gagal, kembalikan text dsb.
    console.error("Response parse error:", parseError);
    throw parseError;
  }
}

/**
 * Fungsi utama: mirip "instance" di axios
 * di mana kita punya baseURL, lalu method get/put/post/del.
 */
const createApi = (defaultOptions = {}) => {
  // Tetapkan baseURL
  const baseURL = process.env.NODE_ENV === "production" ? process.env.EXPO_PUBLIC_API_URL : "http://10.8.0.2:4002";
  console.log("Using baseURL:", baseURL);

  return {
    get: (url, config) =>
      fetchRequest("GET", baseURL, url, null, {
        ...defaultOptions,
        ...config,
      }),
    post: (url, data, config) =>
      fetchRequest("POST", baseURL, url, data, {
        ...defaultOptions,
        ...config,
      }),
    put: (url, data, config) =>
      fetchRequest("PUT", baseURL, url, data, {
        ...defaultOptions,
        ...config,
      }),
    patch: (url, data, config) =>
      fetchRequest("PATCH", baseURL, url, data, {
        ...defaultOptions,
        ...config,
      }),
    del: (url, config) =>
      fetchRequest("DELETE", baseURL, url, null, {
        ...defaultOptions,
        ...config,
      }),
  };
};

export default createApi;
