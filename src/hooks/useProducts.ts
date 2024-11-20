import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/categories/hooks';
import {
  actGetProducts,
  cleanUpProductRecords,
} from '../store/products/productSlice';

const useProducts = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cart.items);
  const { error, loading, records } = useAppSelector((state) => state.products);
  const wishListItems = useAppSelector((state) => state.wishlist.itemsId);

  const productFullInfo = useMemo(
    () =>
      records.map((el) => ({
        ...el,
        quantity: cartItem[el.id as number] || 0,
        isLiked: wishListItems.includes(el.id as number),
      })),
    [records, cartItem, wishListItems]
  );

  useEffect(() => {
    const promise = dispatch(actGetProducts(params.prefix as string));
    return () => {
      dispatch(cleanUpProductRecords());
      promise.abort();
    };
  }, [dispatch, params]);

  const productTitle = useMemo(
    () => `${params.prefix?.toUpperCase()} Products`,
    [params.prefix]
  );

  return {
    productFullInfo,
    productTitle,
    loading,
    error,
  };
};

export default useProducts;
