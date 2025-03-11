import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

let isOffline = false;
let networkStateListeners = [];


// Key untuk data di storage
const STORAGE_KEYS = {
  NETWORK: 'networkState'
};



/**
 * Mengambil status jaringan saat ini (offline/online)
 */
export const getNetworkState = () => isOffline;


/**
 * Menambahkan listener untuk perubahan status jaringan.
 * Fungsi listener akan dipanggil dengan parameter `isOffline`,
 * yaitu boolean yang menandakan apakah sekarang offline atau online.
 *
 * Fungsi ini mengembalikan sebuah fungsi "unsubscribe" yang bisa dipakai
 * untuk berhenti berlangganan perubahan status jaringan.
 */
export const addNetworkStateListener = (listener) => {
  networkStateListeners.push(listener);
  return () => {
    networkStateListeners = networkStateListeners.filter(l => l !== listener);
  };
};


/**
 * Mengubah status offline/online. Dipanggil dengan nilai `true` (offline)
 * atau `false` (online).
 *
 * Setelah berhasil, memanggil semua listener yang telah terdaftar
 * supaya mereka tahu kalau status jaringan berubah.
 */
export const toggleOfflineMode = (newOfflineState) => {
  const previousState = isOffline;
  isOffline = newOfflineState;
  // Simpan state offline/online ke MMKV (sinkron)
  try {
    storage.set(STORAGE_KEYS.NETWORK, JSON.stringify(isOffline));
  } catch (error) {
    //console.error('Failed to persist network state:', error);
  }

  // Jika baru saja kembali online, bisa lakukan hal lain di sini
  // Contoh: memanggil fungsi sinkronisasi data ke server, dsb.
  if (previousState && !newOfflineState) {
    //console.log('Device is now online, you can trigger sync here...');
  }

  // Beritahu semua listener bahwa status jaringan berubah
  networkStateListeners.forEach(listener => listener(isOffline));
  return isOffline;
};




/**
 * Inisialisasi state awal offline/online dari MMKV.
 * Bisa dipanggil sekali saat aplikasi mulai, sebelum
 * addNetworkStateListener atau pemanggilan getNetworkState.
 */
export const initializeNetworkState = () => {
    const storedNetworkState = storage.getString(STORAGE_KEYS.NETWORK);
    //console.log('DEBUG storedNetworkState:', storedNetworkState);
    
    if (storedNetworkState !== undefined) {
      try {
        isOffline = JSON.parse(storedNetworkState);
      } catch (error) {
        //console.error('Failed to parse stored network state:', error);
        // fallback misal default offline/online
        isOffline = false;
      }
    } else {
      // Key belum ada, set default offline/online
      isOffline = false;
    }
};


initializeNetworkState();