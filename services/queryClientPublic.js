import { useEffect, useCallback } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { Platform } from "react-native";
import { MMKV } from "react-native-mmkv";
import { store } from "@/store";



const getNetworkStatus = () => store.getState().device?.networkStatus;
import { useDispatch, useSelector } from "react-redux";
import createRequest from "@/services/api-secure-portal";
import { OfflineStore } from "./OfflineStorage";


export const storage = new MMKV({
  id: "query-cache",
  encryptionKey: process.env.EXPO_PUBLIC_SECRET_KEY_NAME,
});


export const mmkvStorageAdapter = {
  getItem: (key) => {
    try {
      const value = storage.getString(key);
      return value;
    } catch (error) {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      storage.set(key, value);
    } catch (error) {
    }
  },
  removeItem: (key) => {
    try {
      storage.delete(key);
    } catch (error) {
    }
  },
};



export const getNetworkState = () => {
  const networkStatus = store.getState().device?.networkStatus;
  return networkStatus === "offline";
};

export const toggleOfflineMode = async () => {
  try {
    const offline = getNetworkState();
    if (!offline) {
      store.dispatch(setNetworkOffline());
    } else {
      store.dispatch(setNetworkOnline());
    }
  } catch (error) {
    //console.error('Failed to persist network state:', error);
    return getNetworkState();
  }
};





// Async Storage Persister
export const asyncStoragePersister = createAsyncStoragePersister({
  storage: mmkvStorageAdapter,
  key: "REACT_QUERY_OFFLINE_CACHE",
  throttleTime: 1000,
  serialize: (data) => JSON.stringify(data),
  deserialize: (str) => JSON.parse(str),
});

// Query Client Configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
      networkMode: "offlineFirst",
      refetchOnWindowFocus: Platform.OS === "web",
      refetchOnReconnect: true,
      maxRetries: 3,
      retry: (failureCount, error) => {
        if (error.status === 401) return false; // Jangan retry untuk unauthorized
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) =>
        Math.min(1000 * Math.pow(2, attemptIndex), 30000),
      shouldRetry: (error) => {
        return error instanceof NetworkError && error.status !== 404;
      },
    },
    mutations: {
      networkMode: "offlineFirst",
      retry: 3,
    },
  },
});



export const modelKeys = {
  all: ["model"],
  lists: () => [...modelKeys.all, "list"],
  list: (filters) => [...modelKeys.lists(), filters],
  details: () => [...modelKeys.all, "detail"],
  detail: (id) => [...modelKeys.details(), id],
};




export const invalidateModelCache = (queryClient, modelName) => {
  return queryClient.invalidateQueries({
    queryKey: modelKeys.lists(),
    refetchType: "active",
  });
};



const fetchModelData = async (post, options) => {
  const {
    data: { length, records },
  } = await post("/mobile/api/portal/mobile-data", {
    params: {
      model: options.model,
      method: "web_search_read",
      args: [],
      kwargs: {
        specification: options.selectedFields,
        offset: options.offset,
        order: options.order,
        limit: options.limit,
        count_limit: 100001,
        domain: options.domain,
      },
    },
  });
  if (length === undefined || records === undefined) {
    throw new Error("Invalid response from Backend");
  }
  return { length, records };
};




const fetchModelById = async (post, model, id, fields) => {
  const { data } = await post("/mobile/api/portal/mobile-data", {
    params: {
      model: model,
      method: "read",
      args: [id],
      kwargs: {
        specification: fields,
      },
    },
  });
  return data[0];
};



const createModelData = async (post, model, data, options = {}) => {
  const offline = getNetworkStatus() === "offline";
  const tempId = `temp_${Date.now()}`;
  const dataWithTempId = { ...data, id: tempId };
  if (offline) {
    OfflineStore.addToQueue({
      params: {
        model,
        method: "web_save",
        args: [[], data],
        kwargs: {
          specification: {},
        },
      },
    });
    OfflineStore.addOfflineData(model, dataWithTempId);
    return dataWithTempId;
  }
  try {
    const response = await post("/mobile/api/portal/mobile-data", {
      params: {
        model,
        method: "web_save",
        args: [[], data],
        kwargs: {
          specification: {},
        },
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    OfflineStore.addToQueue({
      params: {
        model,
        method: "web_save",
        args: [[], data],
        kwargs: {
          specification: {},
        },
      },
    });
    OfflineStore.addOfflineData(model, dataWithTempId);
    return dataWithTempId;
  }
};



const updateModelData = async (post, model, id, data, options = {}) => {
  const offline = getNetworkStatus() === "offline";
  if (offline) {
    OfflineStore.addToQueue({
      action: "update",
      model,
      data: { id, ...data },
    });
    OfflineStore.updateOfflineData(model, id, data);
    return { id, ...data };
  }
  try {
    const response = await post("/mobile/api/portal/mobile-data", {
      params: {
        model,
        method: "web_save",
        args: [[id], data],
        kwargs: {
          specification: {},
        },
      },
    });
    return response.data;
  } catch (error) {
    OfflineStore.addToQueue({
      action: "update",
      model,
      data: { id, ...data },
    });
    OfflineStore.updateOfflineData(model, id, data);
    return { id, ...data };
  }
};



const deleteModelData = async (post, model, id, options = {}) => {
  const { networkStatus } = useSelector((state) => state.device);
  if (networkStatus === "offline") {
    OfflineStore.addToQueue({
      action: "delete",
      model,
      data: { id },
    });
    OfflineStore.removeOfflineData(model, id);
    return { success: true };
  }
  try {
    const response = await post("/mobile/api/portal/mobile-data", {
      params: {
        model,
        method: "unlink",
        args: [[id]],
      },
    });
    return response.data;
  } catch (error) {
    OfflineStore.addToQueue({
      action: "delete",
      model,
      data: { id },
    });
    OfflineStore.removeOfflineData(model, id);
    return { success: true };
  }
};



// Query Function Creator
const createQueryFn = (post, queryClient, networkStatus, queryKey, options) => {
  return async () => {
    const cachedData = queryClient.getQueryData(queryKey);
    if (networkStatus === "offline") {
      if (cachedData) {
        //console.log('📱 Offline: Menggunakan data cache');
        return cachedData;
      }
      throw new Error(
        "Tidak ada koneksi internet dan data cache tidak tersedia"
      );
    }
    try {
      const result = await fetchModelData(post, options);
      queryClient.setQueryData(queryKey, result);
      return result;
    } catch (error) {
      if (cachedData) {
        //console.log('🔄 Error fetching: Menggunakan cache');
        return cachedData;
      }
      throw error;
    }
  };
};



export const useModelDetail = (model, id, fields) => {
  const queryKey = modelKeys.detail(id);
  const { post } = createRequest();
  const queryClient = useQueryClient();
  return useQuery({
    queryKey,
    queryFn: () => fetchModelById(post, model, id, fields),
    enabled: !!id,
  });
};



export const useModelMutations = (model) => {
  const { post } = createRequest();
  const queryClient = useQueryClient();
  const { networkStatus } = useSelector((state) => state.device);
  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: modelKeys.lists() });
  };

  const createMutation = useMutation({
    mutationFn: async (data) => {
      if (networkStatus === "offline") {
        // Offline handling
        const tempId = `temp_${Date.now()}`;
        const dataWithTempId = { ...data, id: tempId };

        OfflineStore.addToQueue({
          action: "create",
          model,
          data: dataWithTempId,
        });
        OfflineStore.addOfflineData(model, dataWithTempId);
        return dataWithTempId;
      }
      console.log("Creating data for model:", model);
      console.log("Data to be sent:", data);
      return createModelData(post, model, data);
    },
    onSuccess: (data) => {
      invalidateQueries(model);
      // Jika sukses online, update cache
      queryClient.setQueryData(modelKeys.detail(data.id), data);
    },
  });



  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      if (networkStatus === "offline") {
        OfflineStore.addToQueue({
          action: "update",
          model,
          data: { id, ...data },
        });
        OfflineStore.updateOfflineData(model, id, data);
        return { id, ...data };
      }
      return updateModelData(post, model, id, data);
    },

    onSuccess: (data) => {
      invalidateQueries();
      queryClient.setQueryData(modelKeys.detail(data.id), data);
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (networkStatus === "offline") {
        OfflineStore.addToQueue({
          action: "delete",
          model,
          data: { id },
        });
        OfflineStore.removeOfflineData(model, id);
        return { success: true };
      }

      return deleteModelData(post, model, id);
    },
    onSuccess: (_, id) => {
      invalidateQueries();
      // Hapus dari cache
      queryClient.removeQueries(modelKeys.detail(id));
    },
  });

  // Sync Mutation - untuk sinkronisasi manual
  const syncMutation = useMutation({
    mutationFn: async () => {
      if (networkStatus === "offline") {
        throw new Error("Tidak ada koneksi internet");
      }
      return OfflineStore.syncQueue();
    },
    onSuccess: () => {
      invalidateQueries();
    },
  });
  return {
    createMutation,
    updateMutation,
    deleteMutation,
    syncMutation,
  };
};










// Modified Hooks dengan Offline Support
export const useModelQuery = (options) => {
  
  const queryKey = modelKeys.list([
    options.model,
    options.offset,
    options.limit,
    options.order,
    options.domain,
  ]);


  const { post } = createRequest();
  const queryClient = useQueryClient();
  const { networkStatus } = useSelector((state) => state.device);

  const query = useQuery({
    queryKey,
    queryFn: async () => {

      console.log(options.model)
      if (networkStatus === "offline") {
        const offlineData = OfflineStore.getOfflineData(options.model);
        // Tambahkan log untuk memastikan data offline ada
        //console.log('Offline Data useModelQuery:', offlineData);
        // Pastikan return nilai default jika offlineData undefined/null
        return {
          records: offlineData || [],
          length: offlineData?.length || 0,
          isOffline: true,
        };
      }

      try {

        const result = await fetchModelData(post, options);
        //console.log('Query Result:', result);
        const offlineData = OfflineStore.getOfflineData(options.model) || [];
        console.log(options.model)
        console.log('Offline Data:', offlineData);

        return {
          records: result?.records || [],
          totalData: result?.length || 0,
          isOffline: false,
          isStale: false
      };



      } catch (error) {
        console.log(error)
       
        // Log error untuk debugging
        //console.error('Query Error :', error);
        const offlineData = OfflineStore.getOfflineData(options.model);
        if (offlineData && offlineData.length > 0) {
          return {
            records: offlineData,
            length: offlineData.length,
            isOffline: true,
          };
        }
        // Return empty data daripada throw error
        return {
          records: [],
          length: 0,
          isOffline: true,
        };
      }
    },
    keepPreviousData: true,
    // Tambahkan retry config
    retry: false, // Matikan retry karena kita sudah handle offline
  });

  // Auto-sync when coming online
  useEffect(() => {
    if (networkStatus === "online") {
      OfflineStore.syncQueue().then((success) => {
        if (success) {
          queryClient.invalidateQueries(queryKey);
        }
      });
    }
  }, [networkStatus]);

  useEffect(() => {
    if (query.data?.length > options.offset + options.limit) {
      const nextPageOptions = {
        ...options,
        offset: options.offset + options.limit,
      };

      const nextPageQueryKey = modelKeys.list(nextPageOptions);

      queryClient.prefetchQuery({
        queryKey: nextPageQueryKey,
        queryFn: createQueryFn(
          post,
          queryClient,
          networkStatus,
          nextPageQueryKey,
          nextPageOptions
        ),
      });
    }
  }, [query.data, options, queryClient, networkStatus, post]);

  return query;
};






export const useModelInfinityQuery = (options) => {
  const queryKey = modelKeys.list([
    options.model,
    options.limit,
    options.order,
    options.domain,
  ]);
  const { post } = createRequest();

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const result = await fetchModelData(post, {
          ...options,
          offset: pageParam,
        });

        return {
          records: result?.records || [],
          totalData: result?.length || 0,
          offset: pageParam,
          isOffline: false,
          isStale: false,
        };
      } catch (error) {
        //console.error('Infinity Query Error:', error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + options.limit;
      return nextOffset < lastPage.totalData ? nextOffset : undefined;
    },
    keepPreviousData: true,
    retry: false,
  });
};
