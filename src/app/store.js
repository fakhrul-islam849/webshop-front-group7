import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import blogReducer from '../features/blog/blogSlice';
import doctorReducer from '../features/doctor/doctorSlice';
import siteInfoReducer from '../features/siteInfo/siteInfoSlice';
import siteAdReducer from '../features/siteAd/siteAdSlice';
import favoriteReducer from '../features/favourite/favouriteSlice';
import notificationReducer from '../features/notifications/notificationSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    cart: cartReducer,
    blog: blogReducer,
    doctor: doctorReducer,
    siteInfo: siteInfoReducer,
    siteAd: siteAdReducer,
    favorite: favoriteReducer,
    notification: notificationReducer,
  },
  devTools: process.env.NEXT_NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
