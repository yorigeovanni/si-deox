import { useEffect, useCallback } from 'react';
import { QueryClient, useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import {store} from '@/store';
const getNetworkStatus = () => store.getState().device?.networkStatus;


import { useDispatch, useSelector } from 'react-redux';
import createRequest from "@/services/api-secure-internal";
import { OfflineStore } from './OfflineStorage'

// Storage Configuration
export const storage = new MMKV({
    id: 'query-cache',
    encryptionKey: process.env.EXPO_PUBLIC_SECRET_KEY_NAME
});


export const getNetworkState = () => {
    const networkStatus = store.getState().device?.networkStatus;
    return networkStatus === 'offline';
};


// Network state management
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
  



// Storage Adapter
export const mmkvStorageAdapter = {
    getItem: (key) => {
        try {
            const value = storage.getString(key);
            return value;
        } catch (error) {
            //console.error('Error getting item from AsyncStorage:', error);
            return null;
        }
    },
    setItem: (key, value) => {
        try {
            storage.set(key, value)
        } catch (error) {
            //console.error('Error setting item in AsyncStorage:', error);
        }
    },
    removeItem: (key) => {
        try {
            storage.delete(key)
        } catch (error) {
            //console.error('Error removing item from AsyncStorage:', error);
        }
    }
}

// Async Storage Persister
export const asyncStoragePersister = createAsyncStoragePersister({
    storage: mmkvStorageAdapter,
    key: 'REACT_QUERY_OFFLINE_CACHE',
    throttleTime: 1000,
    serialize: data => JSON.stringify(data),
    deserialize: str => JSON.parse(str)
});


// Query Client Configuration
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 3,
            networkMode: 'offlineFirst',
            refetchOnWindowFocus: Platform.OS === 'web',
            refetchOnReconnect: true,
            maxRetries: 3,
            retry: (failureCount, error) => {
                if (error.status === 401) return false; // Jangan retry untuk unauthorized
                return failureCount < 3;
            },
            retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 30000),
            shouldRetry: (error) => {
                return error instanceof NetworkError && error.status !== 404;
            }
        },
        mutations: {
            networkMode: 'offlineFirst',
            retry: 3,
        },
    },
});


export const invalidateModelCache = (queryClient, modelName) => {
    return queryClient.invalidateQueries({
        queryKey: modelKeys.lists(),
        refetchType: 'active',
    });
};




// Model Keys
export const modelKeys = {
    all: ['model'],
    lists: () => [...modelKeys.all, 'list'],
    list: (filters) => [...modelKeys.lists(), filters],
    details: () => [...modelKeys.all, 'detail'],
    detail: (id) => [...modelKeys.details(), id],
}



// Fetch Data Function
const fetchModelData = async (post, options) => {

    //console.log('')
    const { data: { length, records } } = await post('/mobile/api/internal/mobile-data', {
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
        throw new Error('Invalid response from Backend');
    }
    return { length, records };
};


const fetchModelById = async (post, model, id, fields ={}) => {

    const { data } = await post('/mobile/api/internal/mobile-data', {
        params: {
            model: model,
            method: "web_read",
            args: [ [ parseInt(id) ] ],
            kwargs: {
                specification: fields,
            },
        },
    });
    return data[0];
};



// Offline-aware API functions
const createModelData = async (post, model, data, options = {}) => {
    
    const offline = getNetworkStatus() === 'offline';
    const tempId = `temp_${Date.now()}`;
    const dataWithTempId = { ...data, id: tempId };
    if (offline) {
        OfflineStore.addToQueue({
            params: {
                model,
                method: "web_save",
                args: [[],data],
                kwargs: {
                    specification: {},
                  },
            },
        });
        OfflineStore.addOfflineData(model, dataWithTempId);
        return dataWithTempId;
    }
    try {
        const response = await post('/mobile/api/internal/mobile-data', {
            params: {
                model,
                method: "web_save",
                args: [[],data],
                kwargs: {
                    specification: {},
                  },
            },
        });

        return response.data;
    } catch (error) {
        console.log(error)
        OfflineStore.addToQueue({
            params: {
                model,
                method: "web_save",
                args: [[],data],
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
    /*const offline = getNetworkStatus() === 'offline';
    if (offline) {
        OfflineStore.addToQueue({
            action: 'update',
            model,
            data: { id, ...data }
        });
        OfflineStore.updateOfflineData(model, id, data);
        return { id, ...data };
    }*/

    try {
        const response = await post('/mobile/api/internal/mobile-data', {
            params: {
                model,
                method: "web_save",
                args: [[id],data],
                kwargs: {
                    specification: {},
                  },
            },
        });
        return response.data;
    } catch (error) {
        /*OfflineStore.addToQueue({
            action: 'update',
            model,
            data: { id, ...data }
        });
        OfflineStore.updateOfflineData(model, id, data);
        return { id, ...data };*/
        throw error;
    }
};



const deleteModelData = async (post, model, id, options = {}) => {
    const { networkStatus  } = useSelector(state => state.device);


    if (networkStatus === 'offline') {
        OfflineStore.addToQueue({
            action: 'delete',
            model,
            data: { id }
        });
        OfflineStore.removeOfflineData(model, id);
        return { success: true };
    }

    try {
        const response = await post('/mobile/api/internal/mobile-data', {
            params: {
                model,
                method: "unlink",
                args: [[id]],
            },
        });
        return response.data;
    } catch (error) {
        OfflineStore.addToQueue({
            action: 'delete',
            model,
            data: { id }
        });
        OfflineStore.removeOfflineData(model, id);
        return { success: true };
    }
};


// Query Function Creator
const createQueryFn = (post, queryClient, networkStatus, queryKey, options) => {
    return async () => {
        const cachedData = queryClient.getQueryData(queryKey);
        
        if (networkStatus === 'offline') {
            if (cachedData) {
                //console.log('📱 Offline: Menggunakan data cache');
                return cachedData;
            }
            throw new Error('Tidak ada koneksi internet dan data cache tidak tersedia');
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
    const { networkStatus  } = useSelector(state => state.device);
    

    const invalidateQueries = () => {
        queryClient.invalidateQueries({ 
            queryKey: modelKeys.list([model])
        });
    };

    const createMutation = useMutation({
        mutationFn: async (data) => {
            if (networkStatus === 'offline') {
                // Offline handling
                const tempId = `temp_${Date.now()}`;
                const dataWithTempId = { ...data, id: tempId };
                
                OfflineStore.addToQueue({
                    action: 'create',
                    model,
                    data: dataWithTempId
                });
                OfflineStore.addOfflineData(model, dataWithTempId);
                return dataWithTempId;
            }

                console.log('Creating data for model:', model);
                console.log('Data to be sent:', data);
                return createModelData(post, model, data);
        },
        onSuccess: (data) => {
            invalidateQueries();
            // Jika sukses online, update cache
            queryClient.setQueryData(
                modelKeys.detail(data.id),
                data
            );
        }
    });

    // Update Mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            /*if (networkStatus === 'offline') {
                OfflineStore.addToQueue({
                    action: 'update',
                    model,
                    data: { id, ...data }
                });
                OfflineStore.updateOfflineData(model, id, data);
                return { id, ...data };
            }*/
            
            return updateModelData(post, model, id, data);
        },
        onSuccess: (data) => {
            //invalidateQueries();
            // Update cache untuk detail view
           // queryClient.setQueryData(
           //     modelKeys.detail(data.id),
           //     data
           // );
        }
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            if (networkStatus === 'offline') {
                OfflineStore.addToQueue({
                    action: 'delete',
                    model,
                    data: { id }
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
        }
    });

    // Sync Mutation - untuk sinkronisasi manual
    const syncMutation = useMutation({
        mutationFn: async () => {
            if (networkStatus === 'offline') {
                throw new Error('Tidak ada koneksi internet');
            }
            return OfflineStore.syncQueue();
        },
        onSuccess: () => {
            invalidateQueries();
        }
    });

    return {
        createMutation,
        updateMutation,
        deleteMutation,
        syncMutation,
    };
};



// Modified Hooks dengan Offline Support
export const useCustomQuery = (options) => {
    const queryKey = modelKeys.list(options.keys);
    const { post } = createRequest();
    const query = useQuery({
        queryKey,
        queryFn: async () => {
            try {
                const { data } = await post(options.keys, {
                    params: options.params
                });
                return data;
            } catch (error) {
                return {};
            }
        },
        keepPreviousData: true,
       // retry: true
    });
    return query;
};




// Modified Hooks dengan Offline Support
export const useModelQuery = (options) => {
    const queryKey = modelKeys.list([options.model, options.offset, options.limit, options.order, options.domain]);
    const { post } = createRequest();
    const queryClient = useQueryClient();
    const { networkStatus  } = useSelector(state => state.device);
    
    const query = useQuery({
        queryKey,
        queryFn: async () => {
            if (networkStatus === 'offline') {
                const offlineData = OfflineStore.getOfflineData(options.model);
                // Tambahkan log untuk memastikan data offline ada
                //console.log('Offline Data useModelQuery:', offlineData);
                // Pastikan return nilai default jika offlineData undefined/null
                return {
                    records: offlineData || [],
                    length: offlineData?.length || 0,
                    isOffline: true
                };
            }

            try {
                const result = await fetchModelData(post, options);
                //console.log('Query Result:', result);
                const offlineData = OfflineStore.getOfflineData(options.model) || [];

                return {
                    ...result,
                    records: [...(result?.records || []), ...offlineData]
                };
            } catch (error) {
                // Log error untuk debugging
                //console.error('Query Error :', error);
                const offlineData = OfflineStore.getOfflineData(options.model);
                if (offlineData && offlineData.length > 0) {
                    return {
                        records: offlineData,
                        length: offlineData.length,
                        isOffline: true
                    };
                }
                // Return empty data daripada throw error
                return {
                    records: [],
                    length: 0,
                    isOffline: true
                };
            }
        },
        keepPreviousData: true,
        // Tambahkan retry config
        retry: false // Matikan retry karena kita sudah handle offline
    });




    // Auto-sync when coming online
    useEffect(() => {
        if (networkStatus === 'online') {
            OfflineStore.syncQueue().then(success => {
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
                offset: options.offset + options.limit
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
                )
            });
        }
    }, [query.data, options, queryClient, networkStatus, post]); 

    return query;
};




export const useModelInfinityQuery = (options) => {
    const queryKey = /*modelKeys.list([
        options.model, 
        options.limit, 
        options.order, 
        options.domain
    ]);*/[options.model, options.limit, options.order, options.domain];


    const { post } = createRequest();
    const queryClient = useQueryClient();
    const { networkStatus } = useSelector(state => state.device);

    // Konstanta untuk batas penyimpanan offline
    const OFFLINE_STORAGE_LIMIT = 1000; // Batasi jumlah record
    const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik

    const saveToOfflineStore = useCallback((model, newRecords, pageParam, totalCount) => {
        try {
            const offlineData = OfflineStore.getOfflineData(model) || {
                pages: {},
                lastUpdated: Date.now(),
                totalCount: 0
            };

            // Update pages dengan data baru
            const updatedPages = {
                ...offlineData.pages,
                [pageParam]: {
                    records: newRecords.map(record => ({
                        data: record,
                        timestamp: Date.now()
                    })),
                    timestamp: Date.now()
                }
            };

            // Hitung total records yang tersimpan
            const totalStoredRecords = Object.values(updatedPages)
                .reduce((sum, page) => sum + page.records.length, 0);

            // Jika melebihi batas, hapus halaman-halaman lama
            if (totalStoredRecords > OFFLINE_STORAGE_LIMIT) {
                const sortedPages = Object.entries(updatedPages)
                    .sort(([, a], [, b]) => a.timestamp - b.timestamp);

                const limitedPages = {};
                let accumulator = 0;

                // Ambil halaman-halaman terbaru sampai mencapai batas
                for (let i = sortedPages.length - 1; i >= 0; i--) {
                    const [pageKey, pageData] = sortedPages[i];
                    accumulator += pageData.records.length;

                    if (accumulator <= OFFLINE_STORAGE_LIMIT) {
                        limitedPages[pageKey] = pageData;
                    } else {
                        break;
                    }
                }

                OfflineStore.saveOfflineData(model, {
                    pages: limitedPages,
                    lastUpdated: Date.now(),
                    totalCount: Math.min(totalCount, accumulator)
                });
            } else {
                OfflineStore.saveOfflineData(model, {
                    pages: updatedPages,
                    lastUpdated: Date.now(),
                    totalCount: totalCount || totalStoredRecords
                });
            }
        } catch (error) {
            //console.error('Error saving offline data:', error);
        }
    }, []);

    const getOfflineData = useCallback((model, pageParam, limit) => {
        const offlineData = OfflineStore.getOfflineData(model);
        if (!offlineData || !offlineData.pages) return null;

        // Cek expired cache
        const now = Date.now();
        if (now - offlineData.lastUpdated > CACHE_EXPIRY_TIME) {
            OfflineStore.removeOfflineData(model);
            return null;
        }

        // Ambil data halaman yang diminta
        const pageData = offlineData.pages[pageParam];
        if (!pageData) return null;

        return {
            records: pageData.records.map(record => record.data),
            totalCount: offlineData.totalCount
        };
    }, []);


    return useInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam = 0 }) => {
            // Selalu cek data offline terlebih dahulu
            const offlineResult = getOfflineData(options.model, pageParam, options.limit);
            console.log(offlineResult)
            console.log('ANJING EEE', pageParam)

            // Jika offline mode, langsung return data offline
            if (networkStatus === 'offline') {
                if (offlineResult) {
                    return {
                        records: offlineResult.records,
                        totalData: offlineResult.totalCount,
                        offset: pageParam,
                        isOffline: true
                    };
                }
                throw new Error('No offline data available');
            }

            try {
                // Jika online dan ada data offline, tampilkan dulu data offline
                // sambil memperbarui data di background
                /*if (offlineResult) {
                    // Background fetch
                    fetchModelData(post, {
                        ...options,
                        offset: pageParam
                    }).then(result => {
                        if (result?.length) {
                            // Simpan data baru ke offline storage
                            saveToOfflineStore(
                                options.model,
                                result.records,
                                pageParam,
                                result.length
                            );

                            // Update cache dengan data baru
                            queryClient.setQueryData(queryKey, oldData => {
                                if (!oldData) return oldData;

                                // Update pages dengan data baru
                                const pages = [...oldData.pages];
                                pages[pageParam] = {
                                    ...pages[pageParam],
                                    records: result.records,
                                    totalData: result.length,
                                    isOffline: false,
                                    isStale: false
                                };

                                return {
                                    ...oldData,
                                    pages
                                };
                            });
                        }
                    }).catch(console.error);

                    // Return data offline terlebih dahulu
                    return {
                        records: offlineResult.records,
                        totalData: offlineResult.totalCount,
                        offset: pageParam,
                        isOffline: true,
                        isStale: true // Menandakan data sedang diperbarui
                    };
                }*/

                // Jika tidak ada data offline, lakukan fetch normal
                await new Promise(resolve => setTimeout(resolve, 3000));
                const result = await fetchModelData(post, {
                    ...options,
                    offset: pageParam
                });

                if (result?.length) {
                    saveToOfflineStore(
                        options.model,
                        result.records,
                        pageParam,
                        result.length
                    );
                }

                return {
                    records: result?.records || [],
                    totalData: result?.length || 0,
                    offset: pageParam,
                    isOffline: false,
                    isStale: false
                };
            } catch (error) {
                //console.error('Infinity Query Error:', error);
                
                if (offlineResult) {
                    return {
                        records: offlineResult.records,
                        totalData: offlineResult.totalCount,
                        offset: pageParam,
                        isOffline: true,
                        isStale: false
                    };
                }
                throw error;
            }
        },

        getNextPageParam: (lastPage) => {
            const nextOffset = lastPage.offset + options.limit;
            return nextOffset < lastPage.totalData ? nextOffset : undefined;
        },
        keepPreviousData: true,
        retry: false
    });
};













export const sdasdasdasdas_useModelInfinityQuery = (options) => {
    const queryKey = modelKeys.list([options.model, options.limit, options.order, options.domain]);
    const { post } = createRequest();
    const queryClient = useQueryClient();
    const { networkStatus } = useSelector(state => state.device);

    // Konstanta untuk batas penyimpanan offline
    const OFFLINE_STORAGE_LIMIT = 1000; // Batasi jumlah record
    const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik

    const saveToOfflineStore = useCallback((model, newRecords) => {
        try {
            const offlineData = OfflineStore.getOfflineData(model) || { 
                records: {},
                lastUpdated: Date.now(),
                totalCount: 0
            };

            // Gunakan object untuk penyimpanan yang lebih efisien
            const updatedRecords = { ...offlineData.records };
            
            newRecords.forEach(record => {
                updatedRecords[record.id] = {
                    data: record,
                    timestamp: Date.now()
                };
            });

            // Batasi jumlah record yang disimpan
            const recordIds = Object.keys(updatedRecords);
            if (recordIds.length > OFFLINE_STORAGE_LIMIT) {
                // Hapus record lama berdasarkan timestamp
                const sortedIds = recordIds
                    .sort((a, b) => updatedRecords[a].timestamp - updatedRecords[b].timestamp)
                    .slice(recordIds.length - OFFLINE_STORAGE_LIMIT);
                
                const limitedRecords = {};
                sortedIds.forEach(id => {
                    limitedRecords[id] = updatedRecords[id];
                });

                OfflineStore.saveOfflineData(model, {
                    records: limitedRecords,
                    lastUpdated: Date.now(),
                    totalCount: sortedIds.length
                });
            } else {
                OfflineStore.saveOfflineData(model, {
                    records: updatedRecords,
                    lastUpdated: Date.now(),
                    totalCount: recordIds.length
                });
            }
        } catch (error) {
            //console.error('Error saving offline data:', error);
        }
    }, []);

    const getOfflineData = useCallback((model, pageParam, limit) => {
        const offlineData = OfflineStore.getOfflineData(model);
        
        if (!offlineData) return null;

        // Cek expired cache
        const now = Date.now();
        if (now - offlineData.lastUpdated > CACHE_EXPIRY_TIME) {
            OfflineStore.removeOfflineData(model);
            return null;
        }

        const startIndex = pageParam * limit;
        const records = Object.values(offlineData.records)
            .map(item => item.data)
            .slice(startIndex, startIndex + limit);

        return {
            records,
            totalCount: offlineData.totalCount
        };
    }, []);

    return useInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam = 0 }) => {

            const offlineResult = getOfflineData(options.model, pageParam, options.limit);
            if (networkStatus === 'offline') {
                if (offlineResult) {
                    return {
                        records: offlineResult.records,
                        totalData: offlineResult.totalCount,
                        offset: pageParam,
                        isOffline: true
                    };
                }
                throw new Error('No offline data available');
            }

            try {
                /*if (offlineResult) {
                    fetchModelData(post, {
                        ...options,
                        offset: pageParam
                    }).then(result => {
                        if (result?.records?.length) {
                            saveToOfflineStore(options.model, result.records);
                            queryClient.setQueryData(queryKey, old => ({
                                ...old,
                                records: result.records,
                                totalData: result.length,
                                isOffline: false
                            }));
                        }
                    }).catch(//console.error);
                    return {
                        records: offlineResult.records,
                        totalData: offlineResult.totalCount,
                        offset: pageParam,
                        isOffline: true,
                        isStale: true // Menandakan data sedang diperbarui
                    };
                }*/


                // Jika ada data offline, trigger background fetch
                const result = await fetchModelData(post, {
                    ...options,
                    offset: pageParam
                });

                // Simpan data ke offline storage
                if (result?.records?.length) {
                    saveToOfflineStore(options.model, result.records);
                }

                return {
                    records: result?.records || [],
                    totalData: result?.length || 0,
                    offset: pageParam,
                    isOffline: false
                };
            } catch (error) {
                //console.error('Infinity Query Error:', error);
                
                // Coba ambil dari offline store
                const offlineResult = getOfflineData(options.model, pageParam, options.limit);
                if (offlineResult) {
                    return {
                        records: offlineResult.records,
                        totalData: offlineResult.totalCount,
                        offset: pageParam,
                        isOffline: true
                    };
                }
                throw error;
            }
        },
        getNextPageParam: (lastPage) => {
            const nextOffset = lastPage.offset + options.limit;
            return nextOffset < lastPage.totalData ? nextOffset : undefined;
        },
        keepPreviousData: true,
        retry: false
    });
};

/*
export const useModelInfinityQuery = (options) => {
    const queryKey = modelKeys.list([options.model, options.offset, options.limit, options.order, options.domain]);
    const { post } = createRequest();
    const queryClient = useQueryClient();
    const { networkStatus } = useSelector(state => state.device);

    const query = useInfiniteQuery({
        queryKey,
        // Perbaikan pada queryFn untuk mendukung pagination
        queryFn: async ({ pageParam = 0 }) => {
            if (networkStatus === 'offline') {
                const offlineData = OfflineStore.getOfflineData(options.model);
                //console.log('Offline Data:', offlineData);
                const startIndex = pageParam * options.limit;
                const endIndex = startIndex + options.limit;
                
                return {
                    records: offlineData?.slice(startIndex, endIndex) || [],
                    length: offlineData?.length || 0,
                    isOffline: true,
                    nextPage: endIndex < (offlineData?.length || 0) ? pageParam + 1 : undefined
                };
            }

            try {
                const paginatedOptions = {
                    ...options,
                    offset: pageParam * options.limit,
                };
                const result = await fetchModelData(post, paginatedOptions);
                const offlineData = OfflineStore.getOfflineData(options.model) || [];
                
                const combinedRecords = [...(result?.records || []), ...offlineData];
                const hasNextPage = combinedRecords.length > paginatedOptions.limit;

                return {
                    ...result,
                    records: combinedRecords.slice(0, options.limit),
                    nextPage: hasNextPage ? pageParam + 1 : undefined,
                    length: combinedRecords.length
                };
            } catch (error) {
                //console.error('Query Error useModelInfinityQuery :', error);
                const offlineData = OfflineStore.getOfflineData(options.model);
                if (offlineData && offlineData.length > 0) {
                    const startIndex = pageParam * options.limit;
                    const endIndex = startIndex + options.limit;
                    return {
                        records: offlineData.slice(startIndex, endIndex),
                        length: offlineData.length,
                        isOffline: true,
                        nextPage: endIndex < offlineData.length ? pageParam + 1 : undefined
                    };
                }
                return {
                    records: [],
                    length: 0,
                    isOffline: true,
                    nextPage: undefined
                };
            }
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
        // Tambahan opsi untuk infinite query
        cacheTime: 1000 * 60 * 10, // 10 menit
        staleTime: 1000 * 60 * 5,  // 5 menit
        keepPreviousData: true,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        initialPageParam: 0
    });

    // Auto-sync ketika online
    useEffect(() => {
        if (networkStatus === 'online') {
            OfflineStore.syncQueue().then(success => {
                if (success) {
                    queryClient.invalidateQueries(queryKey);
                }
            });
        }
    }, [networkStatus, queryClient, queryKey]);

    // Prefetch halaman berikutnya
    useEffect(() => {
        const lastPage = query.data?.pages[query.data.pages.length - 1];
        if (lastPage?.nextPage) {
            queryClient.prefetchInfiniteQuery({
                queryKey,
                queryFn: () => query.fetchNextPage(),
                staleTime: 1000 * 60 * 5 // 5 menit
            });
        }
    }, [query.data, queryClient, queryKey]);

    return {
        ...query,
        // Helper function untuk memudahkan load more
        loadMore: () => {
            if (!query.isFetchingNextPage && query.hasNextPage) {
                return query.fetchNextPage();
            }
        },
        // Flatten data untuk kemudahan penggunaan
        flatData: query.data?.pages.flatMap(page => page.records) ?? [],
        // Total items
        totalItems: query.data?.pages[0]?.length ?? 0
    };
};

*/



  
/*
export const modelKeys = {
  all: ["model"],
  lists: () => [...modelKeys.all, "list"],
  list: (filters) => [...modelKeys.lists(), filters],
  details: () => [...modelKeys.all, "detail"],
  detail: (id) => [...modelKeys.details(), id],
};

export const useModelQuery = (options) => {
  const queryKey = modelKeys.list(options);

  const { post } = createRequest();
  const queryClient = useQueryClient();


  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const cachedData = queryClient.getQueryData(queryKey);
      if (!networkState.isConnected) {
        if (cachedData) {
          //console.log("📱 Offline: Menggunakan data cache");
          return cachedData;
        }
        throw new Error(
          "Tidak ada koneksi internet dan data cache tidak tersedia"
        );
      }
      try {
        const {
          data: { length, records },
        } = await post("/mobile/api/internal/mobile-data", {
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
        const result = { length, records };
        queryClient.setQueryData(queryKey, result);
        return result;
      } catch (error) {
        if (cachedData) {
          //console.log("🔄 Error fetching: Menggunakan cache");
          return cachedData;
        }
        throw error;
      }
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 24,
    networkMode: "offlineFirst",
    retry: networkState.isConnected ? 2 : false,
    enabled: true,
  });

  useEffect(() => {
    if (query.data?.length > options.offset + options.limit) {
      const nextPageOptions = {
        ...options,
        offset: options.offset + options.limit,
      };

      const new_keys = modelKeys.list(nextPageOptions);
      queryClient.prefetchQuery({
        queryKey: new_keys,
        queryFn: async () => {
          const cachedData = queryClient.getQueryData(new_keys);
          if (!networkState.isConnected) {
            if (cachedData) {
              //console.log("📱 Offline: Menggunakan data cache");
              return cachedData;
            }
            throw new Error(
              "Tidak ada koneksi internet dan data cache tidak tersedia"
            );
          }
          try {
            const {
              data: { length, records },
            } = await post("/mobile/api/internal/mobile-data", {
              params: {
                model: nextPageOptions.model,
                method: "web_search_read",
                args: [],
                kwargs: {
                  specification: nextPageOptions.selectedFields,
                  offset: nextPageOptions.offset,
                  order: nextPageOptions.order,
                  limit: nextPageOptions.limit,
                  count_limit: 100001,
                  domain: nextPageOptions.domain,
                },
              },
            });

            const result = { length, records };
            queryClient.setQueryData(new_keys, result);
            return result;
          } catch (error) {
            if (cachedData) {
              //console.log("🔄 Error fetching: Menggunakan cache");
              return cachedData;
            }
            throw error;
          }
        },
      });
    }
  }, [query.data, options, queryClient]);
  return query;
};
*/
