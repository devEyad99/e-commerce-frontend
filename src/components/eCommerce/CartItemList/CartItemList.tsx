import CartItem from "../CartItem/CartItem";
import { TProducts } from "../../../types/product";

type CartItemListProps = {
  products: (TProducts & { quantity: number })[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

export default function CartItemList({ products, changeQuantityHandler, removeItemHandler }: CartItemListProps) {
  return (
    <div>
      {products.map((product) => (
        <CartItem
          key={product.id}
          {...product}
          changeQuantityHandler={changeQuantityHandler}
          removeItemHandler={removeItemHandler}
        />
      ))}
    </div>
  );
}
