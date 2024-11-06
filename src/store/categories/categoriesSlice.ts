import { createSlice } from '@reduxjs/toolkit';
import actGetCategories from './act/actGetCategories';
import { TLoading } from '../../types/shared';
import { TCategory } from '../../types/category';

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
  reducers: {},
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
      state.error = action.error.message as string;
    });
  },
});

// export const { getCategories, getCategoriesSuccess, getCategoriesFailure } =
//   categoriesSlice.actions;

export { actGetCategories };
export default categoriesSlice.reducer;
