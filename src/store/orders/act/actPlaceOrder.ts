//..
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isAxiosErrorHandler } from '../../../utils';
import { RootState } from '../..';

const actPlaceOrder = createAsyncThunk(
  'orders/actPlaceOrder',
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart, auth } = getState() as RootState;

    const orderItems = cart.productFullInfo.map((el) => ({
      id: el.id,
      title: el.title,
      price: el.price,
      img: el.img,
      quantity: cart.items[el.id as number],
    }));

    try {
      const res = await axios.post('/orders', {
        userId: auth.user?.id,
        items: orderItems,
        subtotal,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actPlaceOrder;
