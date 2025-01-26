import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createRequest from '@/core/api-secure';
import { useDispatch, useSelector } from 'react-redux';
const { post } = createRequest();


export function useFindMany({ model, offset = 0, limit = 20, domain = [], fields = {} }) {
    const { deviceId } = useSelector((state) => state.config);
    return useQuery({
        queryKey: ['default-findAll', model, offset, limit, ...domain],
        queryFn: async () => {
            const action = 'web_search_read';
            const { data } = await post(
                `/mobile/api/internal/${model}/${action}`,
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
                },
                {
                    deviceId
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
    const { deviceId } = useSelector((state) => state.config);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);

    return useMutation({
        mutationFn: async ({ id, data, fields = {} }) => {
            let action = 'web_save';
            let args = [[], data];
            if(id) {
                action = 'write';
                args = [[id], data];

            }
            const response = await post(
                `/mobile/api/internal/${model}/${action}`,
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
                },
                {
                    deviceId,
                    jwtAccessToken
                }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['default-findAll', model]);
        }
    });
}




export function useFindOne({ model, domain = [], fields = {} }) {
    const { deviceId } = useSelector((state) => state.config);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);
    return useQuery({
        queryKey: ['default-findOne', model, ...domain],
        queryFn: async () => {
            const action = 'web_search_read';
            const response = await post(
                `/mobile/api/internal/${model}/${action}`,
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
                },
                {
                    deviceId,
                    jwtAccessToken
                }
            );
            return response.data?.result?.records[0] || {};
        }
    });
}





export function useFindAll({ model, offset = 0, limit = 20, domain = [], fields = {} }) {
    const { deviceId } = useSelector((state) => state.config);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);
    return useQuery({
        queryKey: ['default-findAll', model, offset, limit, ...domain],
        queryFn: async () => {
            const action = 'web_search_read';
            const response = await post(
                `/mobile/api/internal/${model}/${action}`,
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
                },
                {
                    deviceId,
                    jwtAccessToken
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
