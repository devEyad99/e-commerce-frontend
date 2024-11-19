import { Heading } from "../components/common"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { actGetWishlist, productFullInfoCleanUp } from "../store/wishlist/wishlistSlice"
import Product from "../components/eCommerce/Product/Product";
import { Loading } from "../components/feedback";
import { GridList } from "../components/common";


export default function Wishlist() {
  const dispatch = useAppDispatch();
  const {error, loading, productFullInfo} = useAppSelector((state) => state.wishlist);
  const cartItem = useAppSelector(state => state.cart.items);

  useEffect(() => {
    dispatch(actGetWishlist());
    return ()=>{
      dispatch(productFullInfoCleanUp());
    } 
  }, [dispatch])


  const records = productFullInfo.map((el) => ({
    ...el,
    quantity: cartItem[el.id as number] || 0,
    isLiked: true,
  }));

  return (
    <div>
      <Heading>Your Wishlist</Heading>
      <Loading loading={loading} error={error}>
        <GridList records={records} renderItem={(product) => <Product {...product}/>}/>
      </Loading>
    </div>
  )
}
