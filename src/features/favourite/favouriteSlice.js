import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
const initialState = {
  favoriteIds: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavoriteBrandIds: (state, action) => {
      state.favoriteIds = action.payload;
    },
    addInFavoriteList: (state, action) => {
      state.favoriteIds = [...state.favoriteIds, action.payload];
    },
    removedFromFavoriteList: (state, action) => {
      const newArray = _.filter(
        state.favoriteIds,
        (item) => item != action.payload
      );
      state.favoriteIds = newArray;
    },
  },
});

export const {
  setFavoriteBrandIds,
  addInFavoriteList,
  removedFromFavoriteList,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;

export const getAllFavoriteIds = (state) => state.favorite.favoriteIds;
// export const getAllCategories = (state) => state.blog.allCategories;
