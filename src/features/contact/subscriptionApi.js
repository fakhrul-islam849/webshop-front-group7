import { apiSlice } from '../api/apiSlice';

const subscriptionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        subscriptionSubmit: builder.mutation({
            query: (data) => ({
                url: '/newsletter',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useSubscriptionSubmitMutation } = subscriptionApi;
