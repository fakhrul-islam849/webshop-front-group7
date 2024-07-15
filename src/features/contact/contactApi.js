import { apiSlice } from '../api/apiSlice';

const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    contactSubmit: builder.mutation({
      query: (data) => ({
        url: '/contact/submit',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useContactSubmitMutation } = contactApi;
