import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
const initialState = {
  allCategories: [],
  filterCategories: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.allCategories = action.payload;
    },
    setFilter: (state, action) => {
      state.filterCategories = [...state.filterCategories, action.payload];
    },
    removeFilterById: (state, action) => {
      const data = _.remove(
        state.filterCategories,
        (item) => item != action.payload
      );
      state.filterCategories = data;
    },
    clearAllFilter: (state) => {
      state.filterCategories = [];
    },
  },
});

export const { setAllCategories, setFilter, removeFilterById, clearAllFilter } =
  blogSlice.actions;
export default blogSlice.reducer;

export const getFilterCategories = (state) => state.blog.filterCategories;
export const getAllCategories = (state) => state.blog.allCategories;
