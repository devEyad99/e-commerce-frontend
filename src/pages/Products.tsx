import useProducts from "../hooks/useProducts";
import Product from "../components/eCommerce/Product/Product";
import { Loading } from "../components/feedback";
import { GridList, Heading } from "../components/common";


export default function Products() {
  const { productFullInfo, productTitle, loading, error } = useProducts();
  
  return (
    <> 
      <Heading title={productTitle} />
      <Loading loading={loading} error={error} type="product">
        <GridList emptyMessage="there are no products" records={productFullInfo} renderItem={(product) => <Product {...product} />} />
      </Loading>
    </>
  );
}
