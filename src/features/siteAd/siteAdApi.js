import { apiSlice } from '../api/apiSlice';
import { setHomePageAdd } from './siteAdSlice';

const siteAdApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllHomePageAd: builder.query({
      query: () => `/advertiser/get-home-ad`,
      transformResponse: (response, meta, arg) => response.data,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setHomePageAdd(data));
        } catch (err) {}
      },
    }),
  }),
});

export const { useGetAllHomePageAdQuery } = siteAdApi;
