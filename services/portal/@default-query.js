import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createRequest from '@/core/api-secure-portal';
import { useDispatch, useSelector } from 'react-redux';
const { post } = createRequest();



export function useInfiniteFindMany({ model, limit = 20, domain = [], fields = {} }) {
    return useInfiniteQuery({
        queryKey: ['portal-default-infinity-findAll', model, limit, ...domain],
        queryFn: async ({ pageParam = 0 }) => {
            const offset = pageParam;
            const action = 'web_search_read';
            const { data } = await post(
                `/mobile/api/portal/${model}/${action}`,
                {
                    jsonrpc: '2.0',
                    method: 'call',
                    params: {
                        model,
                        method: action,
                        args: [],
                        kwargs: {
                            specification: fields,
                            offset,
                            order: 'write_date DESC',
                            context: {},
                            limit: limit,
                            count_limit: 10001,
                            domain: domain
                        }
                    }
                }
            );
            const totalData = data?.result?.length || 0;
            const records = data?.result?.records || [];
            const totalPages = Math.ceil(totalData / limit);
            return { totalData, records, offset, totalPages };
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextOffset = lastPage.offset + limit;
            // cek jika nextOffset masih < totalData
            if (nextOffset < lastPage.totalData) return nextOffset;
            return undefined; // all data has been fetched
          },
    });
}





export function useFindMany({ model, offset = 0, limit = 20, domain = [], fields = {} }) {

    return useQuery({
        queryKey: ['portal-default-findAll', model, offset, limit, ...domain],
        queryFn: async () => {
            const action = 'web_search_read';
            const { data } = await post(
                `/mobile/api/portal/${model}/${action}`,
                {
                    jsonrpc: '2.0',
                    method: 'call',
                    params: {
                        model,
                        method: action,
                        args: [],
                        kwargs: {
                            specification: fields,
                            offset,
                            order: 'write_date DESC',
                            context: {},
                            limit: limit,
                            count_limit: 10001,
                            domain: domain
                        }
                    }
                }
            );
            const totalData = data?.result?.length || 0;
            const records = data?.result?.records || [];
            const totalPages = Math.ceil(totalData / limit);
            return {totalData, records, totalPages};
        },
        keepPreviousData: true
    });
}






export function useCreateOrEdit(model) {
    const queryClient = useQueryClient();
   
    return useMutation({
        mutationFn: async ({ id, data, fields = {} }) => {
            let action = 'web_save';
            let args = [[], data];
            if(id) {
                action = 'write';
                args = [[id], data];

            }
            const response = await post(
                `/mobile/api/portal/${model}/${action}`,
                {
                    jsonrpc: '2.0',
                    method: 'call',
                    params: {
                        model,
                        method: action,
                        args: args,
                        kwargs: {
                            specification: fields
                        }
                    }
                }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['portal-default-findAll', model]);
        }
    });
}




export function useFindOne({ model, domain = [], fields = {} }) {
    return useQuery({
        queryKey: ['portal-default-findOne', model, ...domain],
        queryFn: async () => {
            const action = 'web_search_read';
            const response = await post(
                `/mobile/api/portal/${model}/${action}`,
                {
                    jsonrpc: '2.0',
                    method: 'call',
                    params: {
                        model,
                        method: action,
                        args: [],
                        kwargs: {
                            specification: fields,
                            offset: 0,
                            order: 'write_date DESC',
                            context: {
                                lang: 'id_ID',
                                tz: 'Asia/Jakarta',
                                uid: 2
                            },
                            limit: 1,
                            count_limit: 1,
                            domain: domain
                        }
                    }
                }
            );
            return response.data?.result?.records[0] || {};
        }
    });
}

