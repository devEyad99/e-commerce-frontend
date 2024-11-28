//..
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/categories/hooks';
import actGetProductById from '../store/cart/act/actGetProductsById';
import {
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductFullInfo,
} from '../store/cart/cartSlice';
import { resetOrderStatus } from '../store/orders/orderSlice';

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const placeOrderStatus = useAppSelector((state) => state.orders.loading);

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

  useEffect(() => {
    const promise = dispatch(actGetProductById());
    return () => {
      promise.abort();
      dispatch(cleanCartProductFullInfo());
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return {
    products,
    loading,
    error,
    changeQuantityHandler,
    removeItemHandler,
    userAccessToken,
    placeOrderStatus,
  };
};

export default useCart;
