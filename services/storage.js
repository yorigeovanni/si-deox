import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Sanitize key to be compatible with SecureStore
const sanitizeKey = (key) => {
  return key.replace(/[^a-zA-Z0-9._-]/g, '_');
};

class WebStorage {
  async getItem(key) {
    return localStorage.getItem(sanitizeKey(key));
  }

  async setItem(key, value) {
    localStorage.setItem(sanitizeKey(key), value);
  }

  async deleteItem(key) {
    localStorage.removeItem(sanitizeKey(key));
  }
}

// Use SecureStore for native platforms, localStorage for web
const storage = Platform.select({
  web: new WebStorage(),
  default: {
    getItem: (key) => SecureStore.getItemAsync(sanitizeKey(key)),
    setItem: (key, value) => SecureStore.setItemAsync(sanitizeKey(key), value),
    deleteItem: (key) => SecureStore.deleteItemAsync(sanitizeKey(key)),
  },
});

export default storage;