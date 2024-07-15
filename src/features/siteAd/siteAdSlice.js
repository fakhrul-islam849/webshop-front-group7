import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
const initialState = {
  homePageAd: [],
  adShowPerItem: 2,
};

const siteAdSlice = createSlice({
  name: 'siteAd',
  initialState,
  reducers: {
    setHomePageAdd: (state, action) => {
      const totalNeed = 9 * state.adShowPerItem;
      const data = action.payload;
      if (action.payload?.length < totalNeed) {
        const loopCount = totalNeed - action.payload?.length;
        const finalData = [];
        for (var i = 1; i <= totalNeed; i++) {
          const randomIndex = Math.floor(
            Math.random() * action.payload?.length
          );
          finalData.push(data[randomIndex]);
        }
        state.homePageAd = finalData;
      } else {
        state.homePageAd = action.payload;
      }
    },
  },
});

export const { setHomePageAdd } = siteAdSlice.actions;
export default siteAdSlice.reducer;

export const getAllHomePageAd = (state) => state.siteAd.homePageAd;
export const adShowCount = (state) => state.siteAd.adShowPerItem;
