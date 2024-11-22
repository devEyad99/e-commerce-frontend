import useCart from "../hooks/useCart";
import { Heading } from "../components/common";
import { CartItemList, CartSubtotalPrice } from "../components/eCommerce";
import { Loading } from "../components/feedback";

export default function Cart() {
  
  const { products, loading, error, changeQuantityHandler, removeItemHandler } = useCart();
  return (
    <>
      <Heading title="Your Cart" />
      <Loading loading={loading} error={error} type="cart">
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
