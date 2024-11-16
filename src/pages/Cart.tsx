import { Heading } from "../components/common";
import { CartItemList, CartSubtotalPrice } from "../components/eCommerce";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/categories/hooks";
import actGetProductById from "../store/cart/act/actGetProductsById";
import { cartItemChangeQuantity, cartItemRemove } from "../store/cart/cartSlice";
import { Loading } from "../components/feedback";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { items, productFullInfo, loading, error } = useAppSelector((state) => state.cart);
  
  useEffect(() => {
    dispatch(actGetProductById());
  }, [dispatch]);

  const products = productFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id as number] || 1, // Fallback to 1 if undefined
  }));

  const changeQuantityHandler = useCallback((id: number, quantity: number) => {
    dispatch(cartItemChangeQuantity({ id, quantity }));
  },[dispatch]);

  const removeItemHandler = useCallback((id: number) => {
  dispatch(cartItemRemove(id))
  }, [dispatch]);

  return (
    <>
      <Heading>Cart</Heading>
      <Loading loading={loading} error={error}> 
        {products.length === 0 ? (
          <div className="text-center text-lg font-bold">Your cart is empty</div>
        ) : (
          <>
            <CartItemList 
              products={products} 
              changeQuantityHandler={changeQuantityHandler} 
              removeItemHandler={removeItemHandler} 
            />
            <CartSubtotalPrice products={products} />
          </>
        )}
      </Loading>
    </>
  );
  
}
