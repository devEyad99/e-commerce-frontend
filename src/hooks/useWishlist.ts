//..
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  actGetWishlist,
  cleanWishlistProductFullInfo,
} from '../store/wishlist/wishlistSlice';

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { error, loading, productFullInfo } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItem = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlist());
    return () => {
      dispatch(cleanWishlistProductFullInfo());
      promise.abort();
    };
  }, [dispatch]);

  const records = useMemo(
    () =>
      productFullInfo.map((el) => ({
        ...el,
        quantity: cartItem[el.id as number] || 0,
        isLiked: true,
      })),
    [productFullInfo, cartItem]
  );

  const title = useMemo(() => 'Wishlist', []);

  return {
    records,
    title,
    error,
    loading,
  };
};

export default useWishlist;
