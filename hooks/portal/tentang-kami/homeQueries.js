import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import createRequest from "@/services/api-secure-portal";



export const query_keys = {
  all: () => ['home.tentang_kami'],
  homeDashboardKey : () => [...query_keys.all(), 'home_dashboard'],
  list: () => [...query_keys.all(), 'list'],
  details: () => [...query_keys.all(), 'detail'],
  detail: (id) => [...query_keys.details(), id],
}



export default () => {
  const { post } = createRequest();
  const queryClient = useQueryClient()

  const homeDashboard = useQuery({
    queryKey: query_keys.homeDashboardKey(),
    queryFn: async() => {
      const { data } = await post(`/mobile/api/portal/internal-action`,{
        params : {},
        queries: [
          `env['x_data_amc'].sudo().search_count([])`,
          `env['x_data_amc'].sudo().search_count([])`,
          `env['x_data_amc'].sudo().search_count([])`,
          `env['x_data_amc'].sudo().search_count([])`,
          `env['x_data_amc'].sudo().search_count([])`,
          `env['x_data_amc'].sudo().search_count([])`,
          `env['x_data_amc'].sudo().search_count([])`,
          `env['x_data_amc'].sudo().search_count([])`,
          `env['x_data_amc'].sudo().search_count([])`,
        ]
      });
      return data;
    }
  })



  return {
    homeDashboard
  }
}
