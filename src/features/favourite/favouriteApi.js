import { apiSlice } from '../api/apiSlice';
import {
  setFavoriteBrandIds,
  addInFavoriteList,
  removedFromFavoriteList,
} from './favouriteSlice';

export const favoriteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => ({
        url: '/cart/get-all-favorites-brand-ids',
      }),
      //   providesTags: ['get-favorites'],
      transformResponse: (response, meta, arg) => response,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.status) {
            dispatch(setFavoriteBrandIds(result.data.data));
          }
        } catch (err) {
          dispatch(setFavoriteBrandIds([]));
        }
      },
    }),
    getFavoritesForTable: builder.query({
      query: () => ({
        url: '/cart/get-favorite-list',
      }),
      //   providesTags: ['get-favorites'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    addToFavorite: builder.mutation({
      query: (data) => ({
        url: `/cart/add-to-favorite`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['get-favorites'],
      transformResponse: (response, meta, arg) => response,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.status) {
            dispatch(addInFavoriteList(arg.brand_id));
          }
        } catch (err) {}
      },
    }),
    removeFromFavorite: builder.mutation({
      query: (data) => ({
        url: `/cart/remove-from-favorite`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['get-favorites'],
      transformResponse: (response, meta, arg) => response,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.status) {
            dispatch(removedFromFavoriteList(arg.brand_id));
          }
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddToFavoriteMutation,
  useRemoveFromFavoriteMutation,
  useGetFavoritesForTableQuery,
} = favoriteApi;
