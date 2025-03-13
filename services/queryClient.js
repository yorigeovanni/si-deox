import {useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import createRequest from "@/services/api-secure-internal";



export const modelKeys = {
    all: ['model'],
    lists: () => [...modelKeys.all, 'list'],
    list: (filters) => [...modelKeys.lists(), filters],
    details: () => [...modelKeys.all, 'detail'],
    detail: (id) => [...modelKeys.details(), id],
}


// Fetch Data Function
export const fetchModelData = async (post, options) => {
    const url = options.url || '/mobile/api/internal/mobile-data';
    const { data: { length, records } } = await post(url, {
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




export const fetchModelById = async (post, options) => {
    const url = options.url || '/mobile/api/internal/mobile-data';
    const { data } = await post(url, {
        params: {
            model: options.model,
            method: "web_read",
            args: [ [ parseInt(options.id) ] ],
            kwargs: {
                specification: options.fields,
            },
        },
    });
    return data[0];
};


export const createModelData = async ( post, options) => {
    try {
        const url = options.url || '/mobile/api/internal/mobile-data';
        const response = await post(url, {
            params: {
                model : options.model,
                method: "web_save",
                args: [[], options.data],
                kwargs: {
                    specification: {},
                  },
            },
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
};



export const updateModelData = async (post, options) => {
    try {
        const url = options.url || '/mobile/api/internal/mobile-data';
        const response = await post(url, {
            params: {
                model : options.model,
                method: "web_save",
                args: [[parseInt(options.id)], options.data],
                kwargs: {
                    specification: {},
                  },
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


const deleteModelData = async (post, options) => {
    try {
        const url = options.url || '/mobile/api/internal/mobile-data';
        const response = await post(url, {
            params: {
                model : options.model,
                method: "unlink",
                args: [[parseInt(options.id)]],
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};







export const useModelDetail = ({queryKey, model, id, fields}) => {
    const _queryKey = [queryKey, id];
    return useQuery({
        queryKey : _queryKey,
        queryFn: () => fetchModelById(model, id, fields),
        enabled: !!id,
    });
};








export const useModelMutations = ({model, queryKey, id }) => {
    const { post } = createRequest();
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: async (data) => {
            return createModelData(model, data);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({  queryKey: [queryKey] });
        }
    });
    // Update Mutation
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }) => {
            return updateModelData(model, id, data);
        },
        onSuccess: (data) => {
            console.log(data[0]);
            queryClient.invalidateQueries({  queryKey: [queryKey, id] });
        },
    });
    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            return deleteModelData(model, id);
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({  queryKey: [queryKey] });
        }
    });
    return {
        createMutation,
        updateMutation,
        deleteMutation
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
    const query = useQuery({
        queryKey : [ options.queryKey ],
        queryFn: async () => {
            try {
                const result = await fetchModelData(options);
                return {
                    records: result?.records || [],
                    totalData: result?.length || 0,
                    offset: pageParam,
                    isOffline: false,
                    isStale: false
                };
            } catch (error) {
                throw error;
            }
        },
        keepPreviousData: true,
        //retry: false
    });
    return query;
};



export const useModelInfinityQuery = (options) => {
    return useInfiniteQuery({
        queryKey : [ options.queryKey ],
        queryFn: async ({ pageParam = 0 }) => {
            try {
                await new Promise(resolve => setTimeout(resolve, 3000));
                const result = await fetchModelData({
                    ...options,
                    offset: pageParam
                });
                return {
                    records: result?.records || [],
                    totalData: result?.length || 0,
                    offset: pageParam,
                    isOffline: false,
                    isStale: false
                };
            } catch (error) {
                throw error;
            }
        },
        getNextPageParam: (lastPage) => {
            const nextOffset = lastPage.offset + options.limit;
            return nextOffset < lastPage.totalData ? nextOffset : undefined;
        },
        keepPreviousData: true,
        //retry: 3
    });
};
