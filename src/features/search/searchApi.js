import { apiSlice } from '../api/apiSlice';

const searchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDragAndGenericSearchResult: builder.query({
      query: ({ searchKey }) =>
        `/generic/generic-and-brand/search?search_key=${searchKey}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const { useGetDragAndGenericSearchResultQuery } = searchApi;
