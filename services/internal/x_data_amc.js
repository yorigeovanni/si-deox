import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import createRequest from '@/core/api-secure';
import { useDispatch, useSelector } from 'react-redux';

const { post } = createRequest();
const baseURL = process.env.NODE_ENV === "production" ? process.env.EXPO_PUBLIC_API_URL: "http://10.8.0.2:4002";
const QUERY_KEY = ['internal-x-data-amc'];
const model = 'x_data_amc';
const selectedFiles = {
    x_studio_sequence: {},
    x_studio_reg_number: {},
    x_studio_operator: { fields: { display_name: {} } },
    x_studio_type_pesawat: { fields: { display_name: {} } },
    x_studio_status: {},
    x_studio_ata: {},
    x_studio_atd: {},
    x_studio_type_penerbangan: {},
    x_studio_block_on: {},
    x_studio_block_off: {},
    x_studio_parking_stand: { fields: { display_name: {} } },
    write_date: {},
    write_uid: { fields: { display_name: {} } },
    create_uid: { fields: { display_name: {} } },
    create_date: {}
};




export function useFindAll({ offset, limit }) {
    const { deviceId } = useSelector((state) => state.config);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);
    return useQuery({
        queryKey: [...QUERY_KEY, offset, limit],
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
                            specification: selectedFiles,
                            offset,
                            order: 'write_date DESC',
                            context: {
                                lang: 'id_ID',
                                tz: 'Asia/Jakarta',
                                uid: 2
                            },
                            limit,
                            count_limit: 10001,
                            domain: [['x_studio_type_penerbangan', '=', 'BERJADWAL']]
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



export function useFindOne({ id, domain = [] }) {
    const { deviceId } = useSelector((state) => state.config);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);
    return useQuery({
        queryKey: [...QUERY_KEY, id, ...domain],
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
                            specification: selectedFiles,
                            offset : 0,
                            order: 'write_date DESC',
                            context: {
                                lang: 'id_ID',
                                tz: 'Asia/Jakarta',
                                uid: 2
                            },
                            limit : 1,
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
            return response.data;
        },
        keepPreviousData: true
    });
}





export function useCreateOrEdit() {
    const queryClient = useQueryClient();
    const { deviceId } = useSelector((state) => state.config);
    const { jwtAccessToken } = useSelector((state) => state.internalUser);

    return useMutation({
        mutationFn: async ({ id, data }) => {
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
                            specification: selectedFiles
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
            queryClient.invalidateQueries(QUERY_KEY);
        }
    });
}
