import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const cryptoNewsHeaders = { 
    'X-RapidAPI-Key': 'YOUR API KEY',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
    // 'X-RapidAPI-Key': '0a62779d1cmsh63960f713370c93p119833jsn7e42577535ce',
    // 'X-RapidAPI-Host': 'bing-search-apis.p.rapidapi.com'
}
    const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';
// const baseUrl = 'https://bing-search-apis.p.rapidapi.com';


const createRequest = (url, params) => {
    const queryString = new URLSearchParams(params).toString();
    return { url: `${url}?${queryString}`, headers: cryptoNewsHeaders };
};

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({}) => createRequest('/v1/coindesk'),
        })
    })

});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;


// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       'tiers[0]': '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'X-RapidAPI-Key': '0a62779d1cmsh63960f713370c93p119833jsn7e42577535ce',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };