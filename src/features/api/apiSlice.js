import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshToken = api.getState().auth.refreshToken;
    if (refreshToken != undefined) {
      const refreshResult = await baseQuery(
        {
          method: 'POST',
          url: '/auth/refresh-token',
          body: { refresh_token: refreshToken ?? '' },
        },
        { ...api, endpoint: 'refresh' },
        extraOptions
      );
      if (refreshResult.data) {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            accessToken: refreshResult.data.access.token,
            user: refreshResult.data.user,
          })
        );

        api.dispatch(
          userLoggedIn({
            accessToken: refreshResult.data.access.token,
            refreshToken: refreshResult.data.refresh.token,
            user: refreshResult.data.user,
          })
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(userLoggedOut());
        localStorage.clear();
        return result;
      }
      return result;
    } else {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }

    return result;
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  // baseQuery: async (args, api, extraOptions) => {
  //     let result = await baseQuery(args, api, extraOptions);

  //     if (result?.error?.status === 401) {
  //         console.log('dsfsd');
  //         // api.dispatch(userLoggedOut());
  //         // localStorage.clear();
  //     }
  //     return result;
  // },
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['get-carts', 'user_data', 'get-favorites'],
  endpoints: (builder) => ({}),
});
