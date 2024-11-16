import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/categories/hooks";
import { actGetProducts, cleanUp as productCleanUp } from "../store/products/productSlice";
import Product from "../components/eCommerce/Product/Product";
import { Loading } from "../components/feedback";
import { GridList, Heading } from "../components/common";


export default function Products() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(state => state.cart.items);
  const {error, loading, records} = useAppSelector((state) => state.products);
  const productFullInfo = records.map((el) => ({...el, quantity: cartItem[el.id as number] || 0}));

  useEffect(() => {
    dispatch(actGetProducts(params.prefix as string));
    return () => {
      dispatch(productCleanUp());
    }
  }, [dispatch, params]);

  return (
    <> 
    <Heading><span className="text-transform: capitalize">{params.prefix} </span>Products</Heading>
    <Loading loading={loading} error={error}>
        <GridList records={productFullInfo} renderItem={(product) => <Product {...product}/>}/>
    </Loading>
    </>
  );
}
