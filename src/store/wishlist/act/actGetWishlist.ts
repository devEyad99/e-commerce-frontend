import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TProducts } from './../../../types/product';
import { isAxiosErrorHandler } from '../../../utils';
import { RootState } from '../..';

type TDataType = 'productsFullInfo' | 'productsIds';
type TResponse = TProducts[];

const actGetWishlist = createAsyncThunk(
  'wishlist/actGetWishlist',
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        {
          signal,
        }
      );
      if (!userWishlist.data.length) {
        return {
          data: [],
          dataType: 'empty',
        };
      }

      if (dataType === 'productsIds') {
        const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
        return {
          data: concatenatedItemsId,
          dataType: 'productsIds',
        };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join('&');

        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`
        );
        return {
          data: response.data,
          dataType: 'productsFullInfo',
        };
      }
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
