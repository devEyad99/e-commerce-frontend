import HeaderCounter from '../HeaderCounter/HeaderCounter'
import  WishlistIcon from "/src/asset/svg/wishlist.svg?react";
import CartIcon from "/src/asset/svg/cart.svg?react";
import { useAppSelector } from "../../../../store/hooks";
import { getCartTotalQuentity } from "../../../../store/cart/selectors";


export default function HeaderLiftBar() {
  const wishlistTotalQuenatity = useAppSelector((state) => state.wishlist.itemsId.length);
  const cartTotalQuenatity = useAppSelector(getCartTotalQuentity);

  
  return (
     <div className="flex-1 flex justify-end items-center space-x-6">
     <div className="flex items-center space-x-6">
       <HeaderCounter to="wishlist" totalQuentity={wishlistTotalQuenatity} title="wishlist" svgIcon={<WishlistIcon title="wishlist" />} />
       {/* Divider */}
       <div className="w-0.5 h-8 bg-black" />
       <HeaderCounter to="cart" totalQuentity={cartTotalQuenatity} title="cart" svgIcon={<CartIcon title="cart" />} />
     </div>
   </div>
  )
}
