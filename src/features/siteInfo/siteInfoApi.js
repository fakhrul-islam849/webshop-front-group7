import { apiSlice } from '../api/apiSlice';
import { setAllSiteInfo, setDashboardData } from './siteInfoSlice';

const siteInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSiteInfo: builder.query({
      query: () => `/site-information/all-info`,
      transformResponse: (response, meta, arg) => response.data,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(setAllSiteInfo(data));
          //   dispatch(messageCreated('Post received!'));
        } catch (err) {
          // `onError` side-effect
          //   dispatch(messageCreated('Error fetching post!'));
        }
      },
    }),
    getDashboardData: builder.query({
      query: () => `/pharmaceutical/public/all-dashboard-data`,
      transformResponse: (response, meta, arg) => response.data,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(setDashboardData(data));
          //   dispatch(messageCreated('Post received!'));
        } catch (err) {
          // `onError` side-effect
          //   dispatch(messageCreated('Error fetching post!'));
        }
      },
    }),
    siteVisitorCount: builder.mutation({
      query: (data) => ({
        url: `/site-information/sit-visitor`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['get-favorites'],
    }),
    adVisitorAndClick: builder.mutation({
      query: (data) => ({
        url: `/site-information/ad-visitor`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['get-favorites'],
    }),
  }),
});

export const {
  useGetAllSiteInfoQuery,
  useGetDashboardDataQuery,
  useSiteVisitorCountMutation,
  useAdVisitorAndClickMutation,
} = siteInfoApi;
