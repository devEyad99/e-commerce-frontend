//..
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { actGetOrders, resetOrderStatus } from '../store/orders/orderSlice';
import { TProducts } from '../types';

function useOrders() {
  const dispatch = useAppDispatch();
  const { orderList, loading, error } = useAppSelector((state) => state.orders);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProducts[]>([]);

  const viewDetailsHandler = (id: number) => {
    const product = orderList.find((order) => order.id === id);
    setShowModal(true);
    setSelectedProduct(product?.items || []);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  return {
    orderList,
    loading,
    error,
    showModal,
    selectedProduct,
    viewDetailsHandler,
    closeModalHandler,
  };
}

export default useOrders;
