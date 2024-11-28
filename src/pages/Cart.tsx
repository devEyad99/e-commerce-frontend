import useCart from "../hooks/useCart";
import { Heading } from "../components/common";
import { CartItemList, CartSubtotalPrice } from "../components/eCommerce";
import { Loading, LottieHandler } from "../components/feedback";

export default function Cart() {
  
  const { products, loading, error, changeQuantityHandler, removeItemHandler, userAccessToken, placeOrderStatus } = useCart();
  return (
    <>
      <Heading title="Your Cart" />
      <Loading loading={loading} error={error} type="cart">
        {placeOrderStatus === "succeeded" ? (
          <div className="text-center text-lg font-bold">
            <LottieHandler type="success" message="Order placed successfully" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-lg font-bold">
            <LottieHandler type="shoppingError" message="Your cart is empty" />
          </div>
        ) : (
          <>
            <CartItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubtotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        )}
      </Loading>
    </>
  );
}