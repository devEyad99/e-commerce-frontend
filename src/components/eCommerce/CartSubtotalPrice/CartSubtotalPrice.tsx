import { TProducts } from "../../../types/product";

type CartSubtotalPriceProps = { products: TProducts[]};


export default function CartSubtotalPrice({ products }: CartSubtotalPriceProps) {
  const subTotal = products.reduce((acc, product) => {
    return acc + product.price * (product.quantity ?? 0)
  }, 0);

  
  
  return (
    <div className="flex justify-between mb-14">
      <span className="block text-lg font-bold">Subtotal:</span>
      <span className="block text-lg font-bold">{subTotal.toFixed(2)} EGP</span>
    </div>
  );
}
