import { createSlice } from '@reduxjs/toolkit';
import actLikeToggle from './act/actLikeToggel';
import actGetWishlist from './act/actGetWishlist';
import { TLoading, TProducts, isString } from '../../types/';

export interface IWishlistState {
  itemsId: number[];
  productFullInfo: TProducts[];
  error: null | string;
  loading: TLoading;
}

const initialState: IWishlistState = {
  itemsId: [],
  productFullInfo: [],
  error: null,
  loading: 'idle',
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    cleanWishlistProductFullInfo(state) {
      state.productFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    // actLikeToggle actions
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      const { type, id } = action.payload;
      if (type === 'add') {
        state.itemsId.push(id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== id);
        state.productFullInfo = state.productFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });

    // actGetWishlist actions
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.productFullInfo = action.payload;
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = 'failed';
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actLikeToggle, actGetWishlist };
export const { cleanWishlistProductFullInfo } = wishlistSlice.actions;
export default wishlistSlice.reducer;
