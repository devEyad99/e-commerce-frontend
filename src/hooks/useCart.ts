//..
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/categories/hooks';
import actGetProductById from '../store/cart/act/actGetProductsById';
import {
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductFullInfo,
} from '../store/cart/cartSlice';

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(actGetProductById());
    return () => {
      dispatch(cleanCartProductFullInfo());
    };
  }, [dispatch]);

  const products = useMemo(
    () =>
      productFullInfo.map((el) => ({
        ...el,
        quantity: items[el.id as number] || 1, // Fallback to 1 if undefined
      })),
    [productFullInfo, items]
  );

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  return {
    products,
    loading,
    error,
    changeQuantityHandler,
    removeItemHandler,
  };
};

export default useCart;
