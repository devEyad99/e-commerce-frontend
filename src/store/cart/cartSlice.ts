import { createSlice } from '@reduxjs/toolkit';
import { TProducts, TLoading, isString } from '../../types';
import actGetProductById from './act/actGetProductsById';

export interface ICartState {
  items: { [key: string]: number };
  productFullInfo: TProducts[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICartState = {
  items: {},
  productFullInfo: [],
  loading: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
    cartItemRemove: (state, action) => {
      const id = action.payload;
      delete state.items[id];
      state.productFullInfo = state.productFullInfo.filter(
        (product) => product.id !== id
      );
    },
    cleanCartProductFullInfo: (state) => {
      state.productFullInfo = [];
    },
    cleanCartAfterPlaceOrder: (state) => {
      state.items = {};
      state.productFullInfo = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actGetProductById.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(actGetProductById.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.productFullInfo = action.payload;
    });
    builder.addCase(actGetProductById.rejected, (state, action) => {
      state.loading = 'failed';
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductFullInfo,
  cleanCartAfterPlaceOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
