import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/categories/hooks";
import { actGetProducts, cleanUp as productCleanUp } from "../store/products/productSlice";
import Product from "../components/eCommerce/Product/Product";
import { Loading } from "../components/feedback";

export default function Products() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {error, loading, records} = useAppSelector((state) => state.products);


  const productsList = records.length > 0 ? records.map((product) => <div key={product.id} className="flex justify-center items-center">
  <Product {...product} />
</div>) : 'there are no products' 

  useEffect(() => {
    dispatch(actGetProducts(params.prefix as string));
    return () => {
      dispatch(productCleanUp());
    }
  }, [dispatch, params]);

  return (
    <Loading loading={loading} error={error}>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mb-32">
      {productsList}
    </div>
    </Loading>
  );
}
