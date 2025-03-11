import createRequest from "@/services/api-secure-internal";
import { getNetworkState } from "./mockSocialService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Storage keys for caching
const STORAGE_KEYS = {
  CACHED_IMAGES: "cachedImages",
  UPLOADED_IMAGES: "uploadedRealImages",
  SYNC_ATTEMPTS: "syncAttempts",
};

// Initialize API client
const { post } = createRequest();

// Page size for pagination
const PAGE_SIZE = 15;

// Cache management
const cacheImages = async (images) => {
  try {
    const existingCache = await AsyncStorage.getItem(
      STORAGE_KEYS.CACHED_IMAGES
    );
    let cachedImages = existingCache ? JSON.parse(existingCache) : {};

    // Add new images to cache with timestamp
    images.forEach((image) => {
      cachedImages[image.id] = {
        ...image,
        cachedAt: new Date().toISOString(),
      };
    });

    await AsyncStorage.setItem(
      STORAGE_KEYS.CACHED_IMAGES,
      JSON.stringify(cachedImages)
    );
  } catch (error) {
    //console.error("Failed to cache images:", error);
  }
};

const getCachedImages = async () => {
  try {
    const cachedImagesJson = await AsyncStorage.getItem(
      STORAGE_KEYS.CACHED_IMAGES
    );
    if (!cachedImagesJson) return [];

    const cachedImagesObj = JSON.parse(cachedImagesJson);
    return Object.values(cachedImagesObj);
  } catch (error) {
    //console.error("Failed to get cached images:", error);
    return [];
  }
};

// Get pending uploads
const getPendingUploads = async () => {
  try {
    const pendingUploadsJson = await AsyncStorage.getItem(
      STORAGE_KEYS.UPLOADED_IMAGES
    );
    if (!pendingUploadsJson) return [];

    return JSON.parse(pendingUploadsJson);
  } catch (error) {
    //console.error("Failed to get pending uploads:", error);
    return [];
  }
};

// Save pending uploads
const savePendingUploads = async (uploads) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.UPLOADED_IMAGES,
      JSON.stringify(uploads)
    );
  } catch (error) {
    //console.error("Failed to save pending uploads:", error);
  }
};

// Get sync attempts
const getSyncAttempts = async () => {
  try {
    const attemptsJson = await AsyncStorage.getItem(STORAGE_KEYS.SYNC_ATTEMPTS);
    if (!attemptsJson) return {};

    return JSON.parse(attemptsJson);
  } catch (error) {
    //console.error("Failed to get sync attempts:", error);
    return {};
  }
};

// Save sync attempts
const saveSyncAttempts = async (attempts) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.SYNC_ATTEMPTS,
      JSON.stringify(attempts)
    );
  } catch (error) {
    //console.error("Failed to save sync attempts:", error);
  }
};

// Transform backend image data to our app format
const transformImageData = (backendImage) => {
  // Base URL for images
  const baseUrl = process.env.EXPO_PUBLIC_API_URL || "https://deoairport.co.id";

  // Construct full URL for image
  let imageUrl = backendImage.url;
  if (backendImage.url && !backendImage.url.startsWith("http")) {
    imageUrl = `${baseUrl}${backendImage.url}`;
  } else if (backendImage.image_src) {
    imageUrl = backendImage.image_src;
  }

  return {
    id: backendImage.id.toString(),
    url: imageUrl,
    title: backendImage.name || "Untitled Image",
    description: backendImage.description || "",
    tags: backendImage.tags || [],
    uploadedAt: backendImage.create_date || new Date().toISOString(),
    width: backendImage.image_width || 800,
    height: backendImage.image_height || 600,
    checksum: backendImage.checksum || "",
    mimetype: backendImage.mimetype || "image/jpeg",
    isFromBackend: true,
  };
};

// API functions with pagination
export const fetchRealImages = async ({ pageParam = 0 }) => {
  try {
    // Check if we're offline
    if (getNetworkState()) {
      throw new Error("No internet connection");
    }

    const offset = pageParam * PAGE_SIZE;

    // Fetch images from real backend
    const { data } = await post("/mobile/api/internal/mobile-data", {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "ir.attachment",
        method: "web_search_read",
        args: [],
        kwargs: {
          specification: {
            id: {},
            name: {},
            mimetype: {},
            description: {},
            checksum: {},
            url: {},
            type: {},
            res_id: {},
            res_model: {},
            public: {},
            access_token: {},
            image_src: {},
            image_width: {},
            image_height: {},
            original_id: {},
            create_date: {},
          },
          offset: offset,
          limit: PAGE_SIZE,
          order: "create_date DESC",
          count_limit: 10001,
          domain: [
            "|",
            ["public", "=", true],
            "&",
            ["res_model", "=", null],
            ["res_id", "=", 0],
            ["name", "ilike", ""],
            [
              "mimetype",
              "in",
              [
                "image/jpg",
                "image/jpeg",
                "image/jpe",
                "image/png",
                "image/svg+xml",
                "image/gif",
                "image/webp",
              ],
            ],
            "!",
            ["name", "=like", "%.crop"],
            "|",
            ["type", "=", "binary"],
            "!",
            ["url", "=like", "/%/static/%"],
            ["original_id", "in", [false]],
            "|",
            ["url", "=", false],
            "!",
            ["url", "=like", "/web/image/website.%"],
            ["key", "=", false],
          ],
        },
      },
    });

    if (data.error) {
      throw new Error(data.error.message || "Failed to fetch images");
    }

    const images = data.records.map(transformImageData);
    const totalCount = data.length;

    // Get pending uploads to include in results
    const pendingUploads = await getPendingUploads();
    const allImages = [...pendingUploads, ...images];

    // Cache images for offline use
    await cacheImages(images);

    console.log(
      `Fetched ${images.length} real images from backend, page ${pageParam}`
    );

    return {
      images: allImages,
      nextPage: offset + PAGE_SIZE < totalCount ? pageParam + 1 : undefined,
      totalCount: totalCount + pendingUploads.length,
      isRealData: true,
    };
  } catch (error) {
    //console.error("Error fetching real images:", error);

    // Fall back to cached images when offline or on error
    const cachedImages = await getCachedImages();
    const pendingUploads = await getPendingUploads();

    // Combine cached images and pending uploads
    const allImages = [...pendingUploads, ...cachedImages];

    const sortedImages = allImages.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedImages = sortedImages.slice(start, end);
    const hasNextPage = end < sortedImages.length;

    console.log(
      `Using ${paginatedImages.length} cached real images, page ${pageParam}`
    );

    return {
      images: paginatedImages,
      nextPage: hasNextPage ? pageParam + 1 : undefined,
      totalCount: sortedImages.length,
      isOfflineData: true,
      isRealData: true,
    };
  }
};

// Search real images
export const searchRealImages = async (query, { pageParam = 0 }) => {
  try {
    // Check if we're offline
    if (getNetworkState()) {
      throw new Error("No internet connection");
    }

    const offset = pageParam * PAGE_SIZE;

    // Fetch images from real backend with search query
    const { data } = await post("/mobile/api/demo/mobile-data", {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "ir.attachment",
        method: "web_search_read",
        args: [],
        kwargs: {
          specification: {
            id: {},
            name: {},
            mimetype: {},
            description: {},
            checksum: {},
            url: {},
            type: {},
            res_id: {},
            res_model: {},
            public: {},
            access_token: {},
            image_src: {},
            image_width: {},
            image_height: {},
            original_id: {},
            create_date: {},
          },
          offset: offset,
          limit: PAGE_SIZE,
          order: "create_date DESC",
          count_limit: 10001,
          domain: [
            "|",
            ["public", "=", true],
            "&",
            ["res_model", "=", null],
            ["res_id", "=", 0],
            ["name", "ilike", query],
            [
              "mimetype",
              "in",
              [
                "image/jpg",
                "image/jpeg",
                "image/jpe",
                "image/png",
                "image/svg+xml",
                "image/gif",
                "image/webp",
              ],
            ],
            "!",
            ["name", "=like", "%.crop"],
            "|",
            ["type", "=", "binary"],
            "!",
            ["url", "=like", "/%/static/%"],
            ["original_id", "in", [false]],
            "|",
            ["url", "=", false],
            "!",
            ["url", "=like", "/web/image/website.%"],
            ["key", "=", false],
          ],
        },
      },
    });

    if (data.error) {
      throw new Error(data.error.message || "Failed to search images");
    }

    const images = data.records.map(transformImageData);
    const totalCount = data.length;

    // Get pending uploads that match the search query
    const pendingUploads = await getPendingUploads();
    const matchingPendingUploads = pendingUploads.filter((upload) =>
      upload.title.toLowerCase().includes(query.toLowerCase())
    );

    const allImages = [...matchingPendingUploads, ...images];

    // Cache search results
    await cacheImages(images);

    console.log(
      `Searched ${images.length} real images for "${query}", page ${pageParam}`
    );

    return {
      images: allImages,
      nextPage: offset + PAGE_SIZE < totalCount ? pageParam + 1 : undefined,
      totalCount: totalCount + matchingPendingUploads.length,
      isRealData: true,
    };
  } catch (error) {
    //console.error("Error searching real images:", error);

    // Fall back to cached images for search
    const cachedImages = await getCachedImages();
    const pendingUploads = await getPendingUploads();

    // Combine and filter both sources
    const allImages = [...pendingUploads, ...cachedImages];
    const filteredImages = allImages.filter(
      (image) =>
        image.title.toLowerCase().includes(query.toLowerCase()) ||
        (image.description &&
          image.description.toLowerCase().includes(query.toLowerCase()))
    );

    const sortedImages = filteredImages.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const paginatedImages = sortedImages.slice(start, end);
    const hasNextPage = end < sortedImages.length;

    console.log(
      `Using ${paginatedImages.length} cached real images for search "${query}", page ${pageParam}`
    );

    return {
      images: paginatedImages,
      nextPage: hasNextPage ? pageParam + 1 : undefined,
      totalCount: sortedImages.length,
      isOfflineData: true,
      isRealData: true,
    };
  }
};

// Upload a new image to real backend
export const uploadRealImage = async (imageData) => {
  // Extract file name and type from the image object
  const fileName = imageData.fileName || `image_${Date.now()}.jpg`;
  const fileType = imageData.type || "image/jpeg";

  // Create a pending upload image object
  const newImage = {
    id: `pending-upload-${Date.now()}`,
    url: imageData.uri,
    title: `Uploaded ${fileName}`,
    description: "This image will be uploaded when you go back online",
    tags: ["pending"],
    uploadedAt: new Date().toISOString(),
    width: 800,
    height: 600,
    isUploaded: true,
    status: "pending_sync",
    pendingUri: imageData.uri,
    base64: imageData.base64,
    mimetype: fileType,
    fileName: fileName,
    isRealData: true,
    syncAttempts: 0,
  };

  try {
    // Check if we're offline
    if (getNetworkState()) {
      // Store pending upload
      const pendingUploads = await getPendingUploads();
      pendingUploads.unshift(newImage);
      await savePendingUploads(pendingUploads);

      console.log("Stored image for upload when back online:", newImage.id);
      return newImage;
    }

    // If online, upload to backend
    const { data } = await post("/mobile/api/internal/mobile-data", {
      jsonrpc: "2.0",
      method: "call",
      params: {
        model: "ir.attachment",
        method: "web_save",
        args: [
          [],
          {
            datas: imageData.base64,
            type: "binary",
            url: false,
            public: true,
            description: false,
            name: fileName,
          },
        ],
        kwargs: {
          specification: {
            name: {},
            mimetype: {},
            description: {},
            checksum: {},
            url: {},
            type: {},
            res_id: {},
            res_model: {},
            public: {},
            access_token: {},
            image_src: {},
            image_width: {},
            image_height: {},
            original_id: {},
          },
        },
      },
    });

    if (data.error) {
      throw new Error(data.error.message || "Failed to upload image");
    }

    const uploadedImage = transformImageData(data[0]);

    // Cache the uploaded image
    await cacheImages([uploadedImage]);

    return uploadedImage;
  } catch (error) {
    //console.error("Error uploading real image:", error);

    // For errors during upload, store locally with pending status
    const pendingUploads = await getPendingUploads();
    pendingUploads.unshift(newImage);
    await savePendingUploads(pendingUploads);

    console.log("Upload failed, stored for retry:", newImage.id);
    return newImage;
  }
};

// Sync manager for handling offline-to-online synchronization
export class RealImageSyncManager {
  static async syncPendingUploads() {
    // Only sync when ONLINE (not offline)
    if (getNetworkState()) {
      console.log("Cannot sync while offline");
      return;
    }

    try {
      // Get pending uploads
      const pendingUploads = await getPendingUploads();
      if (!pendingUploads.length) {
        console.log("No pending uploads to sync");
        return;
      }

      console.log(
        `Found ${pendingUploads.length} pending image uploads to sync`
      );

      // Get sync attempts record
      const syncAttempts = await getSyncAttempts();

      // Track which uploads were processed
      const updatedPendingUploads = [...pendingUploads];
      let syncedCount = 0;
      let failedCount = 0;

      // Process each pending upload
      for (let i = 0; i < updatedPendingUploads.length; i++) {
        const pendingUpload = updatedPendingUploads[i];

        // Skip if not pending sync or missing base64 data
        if (pendingUpload.status !== "pending_sync" || !pendingUpload.base64) {
          console.log(
            `Skipping upload ${pendingUpload.id}: not pending sync or missing base64 data`
          );
          continue;
        }

        // Check if we've already tried this upload too many times (max 3 attempts)
        const attemptCount = syncAttempts[pendingUpload.id] || 0;
        if (attemptCount >= 3) {
          console.log(
            `Skipping upload ${pendingUpload.id}: max attempts (${attemptCount}) reached`
          );
          continue;
        }

        try {
          console.log(
            `Attempting to sync upload: ${pendingUpload.id} (attempt ${
              attemptCount + 1
            })`
          );

          // Upload the image with base64 data
          const { data } = await post("/mobile/api/internal/mobile-data", {
            jsonrpc: "2.0",
            method: "call",
            params: {
              model: "ir.attachment",
              method: "web_save",
              args: [
                [],
                {
                  datas: pendingUpload.base64,
                  type: "binary",
                  url: false,
                  public: true,
                  description: pendingUpload.description || false,
                  name: pendingUpload.fileName || `image_${Date.now()}.jpg`,
                },
              ],
              kwargs: {
                specification: {
                  name: {},
                  mimetype: {},
                  description: {},
                  checksum: {},
                  url: {},
                  type: {},
                  res_id: {},
                  res_model: {},
                  public: {},
                  access_token: {},
                  image_src: {},
                  image_width: {},
                  image_height: {},
                  original_id: {},
                },
              },
            },
          });

          if (data.error) {
            throw new Error(data.error.message || "Failed to upload image");
          }

          console.log(`Successfully synced upload: ${pendingUpload.id}`);

          // Remove from pending uploads
          updatedPendingUploads.splice(i, 1);
          i--; // Adjust index after removal

          // Remove from sync attempts
          delete syncAttempts[pendingUpload.id];

          syncedCount++;
        } catch (error) {
          console.error(
            `Failed to sync pending upload ${pendingUpload.id}:`,
            error
          );

          // Increment attempt count
          syncAttempts[pendingUpload.id] = attemptCount + 1;
          failedCount++;
        }
      }

      // Update pending uploads storage
      await savePendingUploads(updatedPendingUploads);

      // Update sync attempts
      await saveSyncAttempts(syncAttempts);

      console.log(
        `Sync complete: ${syncedCount} succeeded, ${failedCount} failed, ${updatedPendingUploads.length} remaining`
      );
    } catch (error) {
      //console.error("Error syncing pending uploads:", error);
    }
  }
}

// Initialize sync manager properly
let syncInterval = null;

export const initializeSyncManager = () => {
  // Clear any existing interval
  if (syncInterval) {
    clearInterval(syncInterval);
  }

  // Check for pending uploads every 5 minutes when online
  syncInterval = setInterval(() => {
    if (!getNetworkState()) {
      console.log("Checking for pending uploads to sync...");
      RealImageSyncManager.syncPendingUploads();
    }
  }, 5 * 60 * 1000); // 5 minutes

  // Initial sync attempt after a short delay
  setTimeout(() => {
    if (!getNetworkState()) {
      console.log("Initial sync attempt...");
      RealImageSyncManager.syncPendingUploads();
    }
  }, 10000); // 10 seconds

  return () => {
    if (syncInterval) {
      clearInterval(syncInterval);
      syncInterval = null;
    }
  };
};


/*
// Initialize sync manager
initializeSyncManager();
*/