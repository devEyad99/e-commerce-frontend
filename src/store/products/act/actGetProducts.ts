import { TProducts } from './../../../types/product';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type TResponse = TProducts[];

const actGetProducts = createAsyncThunk(
  'products/actGetProducts',
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Server error');
      } else {
        return rejectWithValue('An unexpected error');
      }
    }
  }
);
export default actGetProducts;
