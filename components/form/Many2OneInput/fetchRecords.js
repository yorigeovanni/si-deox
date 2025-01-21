import apiSecure from '@/core/apiSecure';
const { post } = apiSecure();


export default async function fetchRecords(model, searchText) {
    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        model: model,
        method: 'name_search',
        args: [searchText],
        kwargs: {
          limit: 10,
        },
      },
      id: new Date().getTime(),
    };
  
    const response = await post('/mobile/api/internal/call_kw', payload);
    const data = await response.json();
  
    if (data.result) {
      return data.result.map((item) => ({
        id: item[0],
        name: item[1],
      }));
    }
    return [];
  }
  