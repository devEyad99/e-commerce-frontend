import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { actGetWishlist, cleanWishlistProductFullInfo } from "../store/wishlist/wishlistSlice";
import Product from "../components/eCommerce/Product/Product";
import { Loading } from "../components/feedback";
import { GridList, Heading } from "../components/common";

export default function Wishlist() {
  const dispatch = useAppDispatch();
  const { error, loading, productFullInfo } = useAppSelector((state) => state.wishlist);
  const cartItem = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(actGetWishlist());
    return () => {
      dispatch(cleanWishlistProductFullInfo());
    };
  }, [dispatch]);

  const records = useMemo(
    () =>
      productFullInfo.map((el) => ({
        ...el,
        quantity: cartItem[el.id as number] || 0,
        isLiked: true,
      })),
    [productFullInfo, cartItem]
  );

  const title = useMemo(() => "Wishlist", []);

  return (
    <div>
      <Heading title={title} />
      <Loading loading={loading} error={error}>
        <GridList records={records} renderItem={(product) => <Product {...product} />} />
      </Loading>
    </div>
  );
}
