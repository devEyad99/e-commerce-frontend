import { createSlice } from '@reduxjs/toolkit';
import actLikeToggle from './act/actLikeToggel';

export interface IWishlistState {
  itemsId: number[];
}

const initialState: IWishlistState = {
  itemsId: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
});

export { actLikeToggle };
export default wishlistSlice.reducer;
