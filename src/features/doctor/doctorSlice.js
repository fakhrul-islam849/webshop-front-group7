import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
const initialState = {
  allDepartments: [],
  filter: [],
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setAllDepartments: (state, action) => {
      state.allDepartments = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = [...state.filter, action.payload];
    },
    removeFilterById: (state, action) => {
      const data = _.remove(state.filter, (item) => item != action.payload);
      state.filter = data;
    },
    clearAllFilter: (state) => {
      state.filter = [];
    },
  },
});

export const {
  setAllDepartments,
  setFilter,
  removeFilterById,
  clearAllFilter,
} = doctorSlice.actions;
export default doctorSlice.reducer;

export const getFilter = (state) => state.doctor.filter;
export const getAllDepartments = (state) => state.doctor.allDepartments;
