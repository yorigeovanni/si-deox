import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createRequest from '@/core/api-secure-internal';
import { useDispatch, useSelector } from 'react-redux';
import internalUserActions from '@/state/internalUser/internalUserSlice';
const { post } = createRequest();



export function useInfiniteFindMany({ model, limit = 20, domain = [], fields = {} }) {
    const { deviceId } = useSelector((state) => state.globalOtp);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);
    const dispatch = useDispatch();
    // STIAP QUERY SECURE YANG HARUS LOGIN
    // HARUS ADA INI SEBAGAI CALBACK PENANGANGAN KETIKA RESPONSE ERROR 401
    const logoutUserInternal = () => {
        dispatch(internalUserActions.logout());
    };

    return useInfiniteQuery({
        queryKey: ['default-infinity-findAll', model, limit, ...domain],
        queryFn: async ({ pageParam = 0 }) => {
            const offset = pageParam;
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
                    deviceId,
                    jwtAccessToken,
                    logoutUserInternal
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





export function useFindMany({ pathname = null, params = {}, model, offset = 0, limit = 20, domain = [], fields = {} }) {
    const { deviceId } = useSelector((state) => state.globalOtp);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);
    const dispatch = useDispatch();

    // STIAP QUERY SECURE YANG HARUS LOGIN
    // HARUS ADA INI SEBAGAI CALBACK PENANGANGAN KETIKA RESPONSE ERROR 401
    const logoutUserInternal = () => {
        dispatch(internalUserActions.logout());
    };

    if (pathname) {
        return useQuery({
            queryKey: [pathname],
            queryFn: async () => {
                const { data } = await post(
                    `${pathname}`,
                    params,
                    {
                        deviceId,
                        jwtAccessToken,
                        logoutUserInternal
                    }
                );
                const totalData = data?.result?.length || 0;
                const records = data?.result?.records || [];
                const totalPages = Math.ceil(totalData / limit);
                return { totalData, records, totalPages };
            },

            keepPreviousData: true
        });
    }

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
                    deviceId,
                    jwtAccessToken,
                    logoutUserInternal
                }
            );
            const totalData = data?.result?.length || 0;
            const records = data?.result?.records || [];
            const totalPages = Math.ceil(totalData / limit);
            return { totalData, records, totalPages };
        },

        keepPreviousData: true
    });
}






export function useCreateOrEdit(model) {
    const queryClient = useQueryClient();
    const { deviceId } = useSelector((state) => state.globalOtp);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);

    return useMutation({
        mutationFn: async ({ id, data, fields = {} }) => {
            let action = 'web_save';
            let args = [[], data];
            if (id) {
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
    const { deviceId } = useSelector((state) => state.globalOtp);
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
            return response.data?.result?.records[0] || null;
        }
    });
}



export function useDelete(model) {
    const queryClient = useQueryClient();
    const { deviceId } = useSelector((state) => state.globalOtp);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);

    return useMutation({
        mutationFn: async (id) => {
            const response = await post(
                `/mobile/api/internal/${model}/unlink`,
                {
                    jsonrpc: '2.0',
                    method: 'call',
                    params: {
                        model,
                        method: 'unlink',
                        args: [[id]],
                        kwargs: {}
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