
import { TProducts } from "../../../types/product";
import { useAppDispatch } from "../../../store/categories/hooks";
import { actLikeToggle } from "../../../store/wishlist/wishlistSlice";
import { addToCart } from "../../../store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import Like from '../../../asset/svg/like.svg?react';
import LikeFill from "../../../asset/svg/like-fill.svg?react";
import Spinner from "../../common/Spinner/Spinner";


const Product = ({ id, title, cat_prefix, price, img, max, quantity, isLiked }: TProducts) => {
  
  const dispatch = useAppDispatch();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [currentRemainingQuantity, setCurrentRemainingQuantity] = useState(Math.max(0, (max ?? 0) - (quantity ?? 0)));
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (isBtnDisabled) {
      const timeout = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 3000); // Duration of the animation
      return () => clearTimeout(timeout);
    }
  }, [isBtnDisabled]);

  const addToCartHandler = () => {
    if (currentRemainingQuantity > 0) {
      dispatch(addToCart(id));
      setCurrentRemainingQuantity(prevQuantity => Math.max(0, prevQuantity - 1));
      setIsBtnDisabled(true);
    }
  };

  const likeToggleHandler = () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);
    dispatch(actLikeToggle(id as number))
    .unwrap()
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false))
  }

  return (
    <div className="w-48 flex flex-col justify-between p-4 bg-gray-200 shadow-md rounded-lg relative">
      <div onClick={likeToggleHandler} className="absolute top-1.5 right-1.5 bg-white w-7 h-7 rounded flex items-center justify-center cursor-pointer hover:shadow-md">
       {isLoading ? (<Spinner/>) : isLiked ? (<LikeFill/> ) : (<Like />)}
      </div>
      <div className="flex justify-center">
        <img
          src={img}
          alt={title}
          className="w-32 h-32 object-cover"
        />
      </div>
      <h4 title={title} className="text-s mt-2 mb-1 w-full whitespace-nowrap overflow-hidden text-ellipsis">{title}</h4>
      <p className="text-sm mb-1">{cat_prefix}</p>
      <p className="text-sm font-semibold mb-2">{Number(price).toFixed(2)} EGP</p>
      <p className="text-sm mb-2">Remaining Quantity: {currentRemainingQuantity}</p>
      {currentRemainingQuantity === 0 && (
        <p className="text-red-500 text-sm mb-2">You have reached the maximum quantity.</p>
      )}
      <button
        disabled={isBtnDisabled || currentRemainingQuantity === 0}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${isBtnDisabled || currentRemainingQuantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={addToCartHandler}
      >
        {isBtnDisabled ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
};

export default memo(Product);