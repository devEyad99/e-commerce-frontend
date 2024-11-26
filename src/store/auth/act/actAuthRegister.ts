//..
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isAxiosErrorHandler } from '../../../utils';

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  'auth/actAuthRegister',
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await axios.post('/auth/register', formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(isAxiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;
