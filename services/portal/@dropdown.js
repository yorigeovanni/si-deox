import { useQuery } from '@tanstack/react-query';
import createRequest from '@/core/api-secure-portal';
import { useDispatch, useSelector } from 'react-redux';
const { post } = createRequest();


export function useFindAll({ model, offset = 0, limit = 20, domain = [], fields = {} }) {
   
    return useQuery({
        queryKey: ['portal-dropdown-findall', model, offset, limit, ...domain],
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
                }
            );
            return response.data;
        },
        keepPreviousData: true
    });
}
