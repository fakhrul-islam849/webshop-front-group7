import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
              user: result.data.data,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
              user: result.data.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['get-carts'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
              user: result.data.data,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
              user: result.data.data,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
