import { apiSlice } from '../api/apiSlice';
import { setCartItems, setTotalCart } from './cartSlice';

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: () => ({
        url: '/cart/get-carts',
      }),
      providesTags: ['get-carts'],
      transformResponse: (response, meta, arg) => response.data,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setCartItems(result.data));
          dispatch(setTotalCart(Number(result.data?.quantity)));
        } catch (err) {
          dispatch(setCartItems([]));
        }
      },
    }),

    addToCart: builder.mutation({
      query: (data) => ({
        url: `/cart/add-to-cart`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['get-carts'],
      transformResponse: (response, meta, arg) => response,
    }),

    decrementToCart: builder.mutation({
      query: (data) => ({
        url: `/cart/remove-from-cart`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['get-carts'],
      transformResponse: (response, meta, arg) => response,
    }),

    cartItemRemove: builder.mutation({
      query: (data) => ({
        url: `/cart/cart-item-delete`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['get-carts'],
      transformResponse: (response, meta, arg) => response,
    }),
  }),
});

export const {
  useGetCartsQuery,
  useAddToCartMutation,
  useDecrementToCartMutation,
  useCartItemRemoveMutation,
} = cartApi;
