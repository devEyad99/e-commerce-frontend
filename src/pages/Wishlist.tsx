import useWishlist from "../hooks/useWishlist";
import Product from "../components/eCommerce/Product/Product";
import { Loading } from "../components/feedback";
import { GridList, Heading } from "../components/common";

export default function Wishlist() {
  
  const { records, title, loading, error } = useWishlist();
  return (
    <div>
      <Heading title={title} />
      <Loading loading={loading} error={error}>
        <GridList records={records} renderItem={(product) => <Product {...product} />} />
      </Loading>
    </div>
  );
}
