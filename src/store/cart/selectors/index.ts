import { RootState } from '../../index';
import { createSelector } from '@reduxjs/toolkit';

const getCartTotalQuentity = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const totalQuentity = Object.values(items).reduce((acc, current) => {
      return acc + current;
    }, 0);
    return totalQuentity;
  }
);

export { getCartTotalQuentity };
