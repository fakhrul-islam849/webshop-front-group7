import { apiSlice } from '../api/apiSlice';

import { setUnseenNotificationIds } from './notificationSlice';

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => `/notification/get-all-notifications`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getUnseenNotificationIds: builder.query({
      query: () => `/notification/get-unseen-notification-ids`,
      transformResponse: (response, meta, arg) => response,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.status) {
            dispatch(setUnseenNotificationIds(result.data.data));
          }
        } catch (err) {
          dispatch(setUnseenNotificationIds([]));
        }
      },
    }),
    deleteNotification: builder.mutation({
      query: (data) => ({
        url: `/notification/delete-notification`,
        method: 'POST',
        body: data,
      }),
      //   invalidatesTags: ['get-favorites'],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetUnseenNotificationIdsQuery,
  useDeleteNotificationMutation,
} = notificationApi;
