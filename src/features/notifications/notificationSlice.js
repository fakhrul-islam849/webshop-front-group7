import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
const initialState = {
  unseenNotificationIds: [],
};

const NotificationSliceSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setUnseenNotificationIds: (state, action) => {
      state.unseenNotificationIds = action.payload;
    },
    removeUnseenId: (state, action) => {
      const newArray = _.filter(
        state.unseenNotificationIds,
        (item) => item != action.payload
      );
      state.unseenNotificationIds = newArray;
    },
  },
});

export const { setUnseenNotificationIds, removeUnseenId } =
  NotificationSliceSlice.actions;
export default NotificationSliceSlice.reducer;

export const getAllUnseenNotificationIds = (state) =>
  state.notification.unseenNotificationIds;
// export const getAllCategories = (state) => state.blog.allCategories;
