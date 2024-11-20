import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TProducts } from './../../../types/product';
import { isAxiosErrorHandler } from '../../../utils';

type TResponse = TProducts[];

const actGetWishlist = createAsyncThunk(
  'wishlist/actGetWishlist',
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal } = thunkAPI;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        '/wishlist?userId=1',
        {
          signal,
        }
      );
      if (!userWishlist.data.length) {
        return fulfillWithValue([]);
      }

      const concatenatedItemsId = userWishlist.data
        .map((el) => `id=${el.productId}`)
        .join('&');

      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
