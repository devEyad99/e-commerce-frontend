import { TProducts } from "../../../types/product";

export default function Product({ title, cat_prefix, price, img}: TProducts) {
  return (
    <div className="w-48 flex flex-col justify-between p-4 bg-gray-200 shadow-md rounded-lg">
      <div className="flex justify-center">
        <img
          src={img}
          alt={title}
          className="w-32 h-32 object-cover"
        />
      </div>
      <h4 title={title} className="text-s mt-2 mb-1 w-full whitespace-nowrap overflow-hidden text-ellipsis">{title}</h4>
      <p className="text-sm mb-1">{cat_prefix}</p>
      <p className="text-sm font-semibold mb-2">{price}</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">Add to Cart</button>
    </div>
  );
}
