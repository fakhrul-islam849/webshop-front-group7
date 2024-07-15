import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItem: [],
  totalCart: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItem = action.payload;
    },
    setTotalCart: (state, action) => {
      state.totalCart = action.payload;
    },
  },
});

export const { setCartItems, setTotalCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCartCount = (state) => state.cart.totalCart;
