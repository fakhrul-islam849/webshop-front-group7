import { apiSlice } from '../api/apiSlice';

const PharmaceuticalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPharmaceuticalList: builder.query({
      query: ({ page, search_key }) =>
        `/pharmaceutical/public/get-list?page=${page}&search_key=${search_key}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getPharmaceuticalById: builder.query({
      query: (id) => `/pharmaceutical/public/get-pharmaceutical/${id}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const { useGetPharmaceuticalListQuery, useGetPharmaceuticalByIdQuery } =
  PharmaceuticalApi;
