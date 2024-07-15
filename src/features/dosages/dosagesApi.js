import { apiSlice } from '../api/apiSlice';

const genericApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDosagesType: builder.query({
      query: ({ page, search_key }) =>
        `/dosage/public/get-list?page=${page}&search_key=${search_key}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const { useGetDosagesTypeQuery } = genericApi;
