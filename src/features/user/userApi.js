import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/auth/get-detail',
      }),
      transformResponse: (response, meta, arg) => response.data,
      providesTags: ['user_data'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/auth/update-user-info',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user_data'],
      transformResponse: (response, meta, arg) => response,
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
