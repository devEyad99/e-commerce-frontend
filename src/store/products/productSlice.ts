import { TProducts } from './../../types/product';
import { createSlice } from '@reduxjs/toolkit';
import actGetProducts from './act/actGetProducts';
import { TLoading } from '../../types/shared';

// interface for state
export interface ICategoriesState {
  records: TProducts[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: 'idle',
  error: null,
};
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    cleanUpProductRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProducts.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(actGetProducts.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.records = action.payload;
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message as string;
    });
  },
});

export const { cleanUpProductRecords } = productsSlice.actions;
export { actGetProducts };
export default productsSlice.reducer;
