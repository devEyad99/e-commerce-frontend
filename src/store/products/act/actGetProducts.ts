import { TProducts } from './../../../types/product';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isAxiosErrorHandler } from '@utils';
// import { isAxiosErrorHandler } from '../../../utils';

type TResponse = TProducts[];

const actGetProducts = createAsyncThunk(
  'products/actGetProducts',
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);
export default actGetProducts;
