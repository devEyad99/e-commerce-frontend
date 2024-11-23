import useWishlist from "../hooks/useWishlist";
import Product from "../components/eCommerce/Product/Product";
import { Loading } from "../components/feedback";
import { GridList, Heading } from "../components/common";

export default function Wishlist() {
  
  const { records, title, loading, error } = useWishlist();
  return (
    <div>
      <Heading title={title} />
      <div className="text-center text-lg font-bold">
      <Loading loading={loading} error={error} type="product">
        <GridList emptyMessage="your wishlist is empty" records={records} renderItem={(product) => <Product {...product} />} />
      </Loading>
      </div>
    </div>
  );
}
