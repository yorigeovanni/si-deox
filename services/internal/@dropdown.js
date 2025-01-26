import { useQuery } from '@tanstack/react-query';
import createRequest from '@/core/api-secure-internal';
import { useDispatch, useSelector } from 'react-redux';
const { post } = createRequest();


export function useFindAll({ model, offset = 0, limit = 20, domain = [], fields = {} }) {
    const { deviceId } = useSelector((state) => state.config);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);
    return useQuery({
        queryKey: ['dropdown-findall', model, offset, limit, ...domain],
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
                            limit : limit,
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
            return response.data;
        },
        keepPreviousData: true
    });
}
