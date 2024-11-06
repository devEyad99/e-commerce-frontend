import { Link } from "react-router-dom";
import { TCategory } from "../../../types/category";

export default function Category({title, img, prefix}: TCategory) {
  return (
    <div className="h-44 w-44 px-5">
      <Link to={`/categories/products/${prefix}`}>     
      <div className={"overflow-hidden rounded-full bg-gray-200"}>
        <img src={img} alt={title} />
      </div>
      <h4 className="text-center mt-2">{title}</h4>
      </Link>
    </div>
  )
}
