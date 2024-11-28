import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const actLikeToggle = createAsyncThunk(
//   'wishlist/actLikeToggle',
//   async (id: number, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const isRecordExist = await axios.get(
//         `/wishlist?userId=1&productId=${id}`
//       );
//       if (isRecordExist.data.length) {
//         await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
//         return { type: 'remove', id };
//       } else {
//         await axios.post('/wishlist', {
//           userId: id,
//           productId: id,
//         });
//         return { type: 'add', id };
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return rejectWithValue(error.response?.data.message || error.message);
//       } else {
//         return rejectWithValue('An unexpected error');
//       }
//     }
//   }
// );

// export default actLikeToggle;

const actLikeToggle = createAsyncThunk(
  'wishlist/actLikeToggle',
  async (
    { userId, productId }: { userId: number; productId: number },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=${userId}&productId=${productId}`
      );
      if (isRecordExist.data.length) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: 'remove', id: productId };
      } else {
        await axios.post('/wishlist', {
          userId,
          productId,
        });
        return { type: 'add', id: productId };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue('An unexpected error');
      }
    }
  }
);

export default actLikeToggle;
