import { TProducts } from "../../../types";
import { memo } from "react";

type CartItemProps = TProducts & {
  quantity: number;
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(({ id, title, img, price, max, quantity, changeQuantityHandler, removeItemHandler }: CartItemProps) => {

  const renderOption = Array(max).fill(0).map((_, ind) => {
    const quantity = ++ind;
    return (
      <option key={quantity} value={quantity}>
        {quantity}
      </option>
    );
  });

  const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = +event.target.value;
    if (id !== undefined) {
      changeQuantityHandler(id, quantity);
    }
  };

  return (
    <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-300">
      <div className="flex">
        <div className="bg-gray-200">
          <img
            src={img}
            alt={title}
            className="h-44"
          />
        </div>
        <div className="ml-2 flex flex-col w-36">
          <h2 className="text-base mb-3">{title}</h2>
          <h3 className="text-sm">{price} EGP</h3>
          <button className="mt-auto w-[100px] bg-gray-500 text-white py-1 px-3 rounded" onClick={() => id !== undefined && removeItemHandler(id)}>
            Remove
          </button>
        </div>
      </div>

      <div>
        <span className="block mb-1">Quantity</span>
        <select
          value={quantity}
          onChange={changeQuantity}
          className="border border-gray-300 rounded p-1"
        >
          {renderOption}
        </select>
      </div>
    </div>
  );
});

export default CartItem;
