import axios from 'axios';
import qs from 'qs';
const addPrependingSlash = (url) => (url.charAt(0) !== '/' ? `/${url}` : url);
const hasProtocol = (url) => new RegExp('^(?:[a-z+]+:)?//', 'i').test(url);
const normalizeUrl = (url) => (hasProtocol(url) ? url : addPrependingSlash(url));



const instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { encode: false });
  }
});




instance.interceptors.request.use(async (config) => {
  return config;
},
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Response Error:", error.response.data);
      } else if (error.request) {
        console.error("Request Error:", error.request);
      } else {
        // Masalah lain saat membuat permintaan
        console.error("Axios Error:", error.message);
      }
    } else {
      console.error("Unexpected Error:", error);
    }
    return Promise.reject(error)
  });





const api = (defaultOptions = {}) => {
  instance.defaults.baseURL = process.env.NODE_ENV === "production" ? process.env.EXPO_PUBLIC_API_URL : "http://10.8.0.2:4002";
  console.log(instance.defaults.baseURL);
  return {
    get: (url, config) =>
      instance.get(normalizeUrl(url), {
        ...defaultOptions,
        ...config,
      }),
    put: (url, data, config) => {
      return instance.put(normalizeUrl(url), data, { ...defaultOptions, ...config });
    },
    post: (url, data, config) => {
      return instance.post(normalizeUrl(url), data, { ...defaultOptions, ...config });
    },
    del: (url, config) => {
      return instance.delete(normalizeUrl(url), { ...defaultOptions, ...config })
    },
  };
};


export default api;
