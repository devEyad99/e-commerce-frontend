import { createSlice } from '@reduxjs/toolkit';
import actGetCategories from './act/actGetCategories';
import { TCategory, isString, TLoading } from '../../types/';

// interface for state
export interface ICategoriesState {
  categories: TCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  categories: [],
  loading: 'idle',
  error: null,
};
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    cleanUpCategoriesRecords: (state) => {
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.categories = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = 'failed';
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetCategories };
export const { cleanUpCategoriesRecords } = categoriesSlice.actions;
export default categoriesSlice.reducer;
