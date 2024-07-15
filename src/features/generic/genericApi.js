import { apiSlice } from '../api/apiSlice';

const genericApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGenericList: builder.query({
      query: ({ page, search_key }) =>
        `/generic/public/get-list?page=${page}&search_key=${search_key}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getGenericListHerbal: builder.query({
      query: ({ page, search_key }) =>
        `/generic/public/get-list?page=${page}&search_key=${search_key}&type=2`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getGenericDetailsById: builder.query({
      query: (id) => `/generic/public/generic-details/${id}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getOnlyGenericDetailsById: builder.query({
      query: (id) => `/generic/public/only-generic-details/${id}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetGenericListQuery,
  useGetGenericListHerbalQuery,
  useGetGenericDetailsByIdQuery,
  useGetOnlyGenericDetailsByIdQuery,
} = genericApi;
