//..

type ProductInfo = {
  title: string;
  img: string;
  price: number;
  quantity: number;
  direction?: "row" | "column";
  children?: React.ReactNode;
  style: string
}

export const ProductInfo = ({title, img, price, direction="row", children, style, quantity}: ProductInfo) => {
  return (
    <div className={style}>
        <div className="bg-gray-200">
          <img
            src={img}
            alt={title}
            className="h-44"
          />
        </div>
        <div className="ml-2 flex flex-col w-36">
          <h2 title={title} className="text-base mb-3">{title}</h2>
          <h3 className="text-sm">{price} EGP</h3>
           {quantity && <h3>Total Quantity: {quantity}</h3>}
           {quantity && <h3>Total Price: {(quantity * price).toFixed(2)}</h3>}
           {children}
        </div>
      </div>
  )
}
