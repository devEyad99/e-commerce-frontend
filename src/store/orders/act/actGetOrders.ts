//..
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosErrorHandler } from '../../../utils';
import { RootState } from '../..';
import { TOrderItem } from '../../../types';

type TResponse = TOrderItem[];

const actGetOrders = createAsyncThunk(
  'orders/actGetOrders',
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const res = await axios.get<TResponse>(
        `/orders?userId=${auth.user?.id}`,
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

export default actGetOrders;
