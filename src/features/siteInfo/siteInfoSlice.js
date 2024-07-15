import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
const initialState = {
  allSiteInfo: [],
  dashboardData: {},
};

const siteInfoSlice = createSlice({
  name: 'siteInfo',
  initialState,
  reducers: {
    setAllSiteInfo: (state, action) => {
      state.allSiteInfo = action.payload;
    },
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
  },
});

export const { setAllSiteInfo, setDashboardData } = siteInfoSlice.actions;
export default siteInfoSlice.reducer;

export const getAllSiteInfo = (state) => state.siteInfo.allSiteInfo;
export const getDashboardData = (state) => state.siteInfo.dashboardData;
// export const getAllCategories = (state) => state.blog.allCategories;
