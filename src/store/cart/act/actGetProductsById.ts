import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { TProducts } from '../../../types/product';
import { isAxiosErrorHandler } from '../../../utils';

type TResponse = TProducts[];

const actGetProductById = createAsyncThunk(
  'cart/actGetProductById',
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    if (itemsId.length === 0) {
      return fulfillWithValue([]);
    }
    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join('&');
      const res = await axios.get<TResponse>(
        `/products/?${concatenatedItemsId}`,
        {
          signal,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actGetProductById;
