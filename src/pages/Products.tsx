import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/categories/hooks";
import { actGetProducts, cleanUpProductRecords } from "../store/products/productSlice";
import Product from "../components/eCommerce/Product/Product";
import { Loading } from "../components/feedback";
import { GridList, Heading } from "../components/common";

export default function Products() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state) => state.cart.items);
  const { error, loading, records } = useAppSelector((state) => state.products);
  const wishListItems = useAppSelector((state) => state.wishlist.itemsId);

  const productFullInfo = useMemo(
    () =>
      records.map((el) => ({
        ...el,
        quantity: cartItem[el.id as number] || 0,
        isLiked: wishListItems.includes(el.id as number),
      })),
    [records, cartItem, wishListItems]
  );

  useEffect(() => {
    dispatch(actGetProducts(params.prefix as string));
    return () => {
      dispatch(cleanUpProductRecords());
    };
  }, [dispatch, params]);

  const productTitle = useMemo(() => `${params.prefix?.toUpperCase()} Products`, [params.prefix]);

  return (
    <>
      <Heading title={productTitle} />
      <Loading loading={loading} error={error}>
        <GridList records={productFullInfo} renderItem={(product) => <Product {...product} />} />
      </Loading>
    </>
  );
}
