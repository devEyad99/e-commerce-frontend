//..
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isAxiosErrorHandler } from '../../../utils';

type TFormData = {
  email: string;
  password: string;
};

export type TResponse = {
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const actAuthLogin = createAsyncThunk(
  'auth/actAuthLogin',
  async (formData: TFormData, Thunk) => {
    const { rejectWithValue } = Thunk;
    try {
      const res = await axios.post<TResponse>('/login', formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
