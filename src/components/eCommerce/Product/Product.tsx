
// import { TProducts } from "../../../types/product";
// import { useAppDispatch } from "../../../store/categories/hooks";
// import { actLikeToggle } from "../../../store/wishlist/wishlistSlice";
// import { addToCart } from "../../../store/cart/cartSlice";
// import { memo, useEffect, useState } from "react";
// import Like from '../../../asset/svg/like.svg?react';
// import LikeFill from "../../../asset/svg/like-fill.svg?react";
// import Spinner from "../../common/Spinner/Spinner";
// import { ProductInfo } from "../ProductInfo/ProductInfo";

// const Product = ({ id, title, cat_prefix, price, img, max, quantity, isLiked, isAuthenticated }: TProducts) => {
  
//   const dispatch = useAppDispatch();
//   const [isBtnDisabled, setIsBtnDisabled] = useState(false);
//   const [currentRemainingQuantity, setCurrentRemainingQuantity] = useState(Math.max(0, (max ?? 0) - (quantity ?? 0)));
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);


//   useEffect(() => {
//     if (isBtnDisabled) {
//       const timeout = setTimeout(() => {
//         setIsBtnDisabled(false);
//       }, 3000); // Duration of the animation
//       return () => clearTimeout(timeout);
//     }
//   }, [isBtnDisabled]);

//   const addToCartHandler = () => {
//     if (currentRemainingQuantity > 0) {
//       dispatch(addToCart(id));
//       setCurrentRemainingQuantity(prevQuantity => Math.max(0, prevQuantity - 1));
//       setIsBtnDisabled(true);
//     }
//   };

//   const likeToggleHandler = () => {
//     console.log("isAuthenticated:", isAuthenticated);
//     if(isAuthenticated){
//       if(!isLoading){
//         setIsLoading(true);
//         dispatch(actLikeToggle(id as number))
//         .unwrap()
//         .then(() => setIsLoading(false))
//         .catch(() => setIsLoading(false))
//       }
//     }else{
//       setShowModal(true);
//     }
//   }

//   return (
//     <>
//      {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg">
//             <div className="flex justify-between items-center border-b pb-3">
//               <h3 className="text-lg font-bold">Login Required</h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-500 hover:text-gray-800 focus:outline-none"
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="mt-4">
//               <p className="text-gray-700">
//                 You need to login first to add this item to your wishlist.
//               </p>
//             </div>
//             <div className="mt-6 flex justify-end space-x-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     <div className="w-48 flex flex-col justify-between p-4 bg-gray-200 shadow-md rounded-lg relative">
//       <div onClick={likeToggleHandler} className="absolute top-1.5 right-1.5 bg-white w-7 h-7 rounded flex items-center justify-center cursor-pointer hover:shadow-md">
//        {isLoading ? (<Spinner/>) : isLiked ? (<LikeFill/> ) : (<Like />)}
//       </div>
//       <div className="flex justify-center">
//         <img
//           src={img}
//           alt={title}
//           className="w-32 h-32 object-cover"
//         />
//       </div>
//       <h4 title={title} className="text-s mt-2 mb-1 w-full whitespace-nowrap overflow-hidden text-ellipsis">{title}</h4>
//       <p className="text-sm mb-1">{cat_prefix}</p>
//       <p className="text-sm font-semibold mb-2">{Number(price).toFixed(2)} EGP</p>
//       <p className="text-sm mb-2">Remaining Quantity: {currentRemainingQuantity}</p>
//       {currentRemainingQuantity === 0 && (
//         <p className="text-red-500 text-sm mb-2">You have reached the maximum quantity.</p>
//       )}
//       <button
//         disabled={isBtnDisabled || currentRemainingQuantity === 0}
//         className={`bg-blue-500 text-white py-2 px-4 rounded ${isBtnDisabled || currentRemainingQuantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//         onClick={addToCartHandler}
//       >
//         {isBtnDisabled ? (
//           <div className="flex items-center">
//             <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Loading...
//           </div>
//         ) : (
//           'Add to Cart'
//         )}
//       </button>
//     </div>
//     </>
//   );
// };

// export default memo(Product);

import { TProducts } from "../../../types/product";
import { useAppDispatch } from "../../../store/categories/hooks";
import { actLikeToggle } from "../../../store/wishlist/wishlistSlice";
import { addToCart } from "../../../store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import Like from '../../../asset/svg/like.svg?react';
import LikeFill from "../../../asset/svg/like-fill.svg?react";
import Spinner from "../../common/Spinner/Spinner";
import { ProductInfo as ProductInfoComponent } from "../ProductInfo/ProductInfo";
import { useAppSelector } from "../../../store/hooks";

const Product = ({ id, title, cat_prefix, price, img, max, quantity, isLiked, isAuthenticated }: TProducts) => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.auth);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [currentRemainingQuantity, setCurrentRemainingQuantity] = useState(Math.max(0, (max ?? 0) - (quantity ?? 0)));
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isBtnDisabled) {
      const timeout = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isBtnDisabled]);

  const addToCartHandler = () => {
    if (currentRemainingQuantity > 0) {
      dispatch(addToCart(id));
      setCurrentRemainingQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
      setIsBtnDisabled(true);
    }
  };

  const likeToggleHandler = () => {
    if (isAuthenticated) {
      if (!isLoading) {
        setIsLoading(true);
        dispatch(actLikeToggle({
          userId: user?.id as number,
          productId: id as number
      }))
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-bold">Login Required</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                &times;
              </button>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">You need to login first to add this item to your wishlist.</p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ProductInfoComponent
        title={title}
        img={img}
        price={price}
        style="w-48 flex flex-col justify-between p-4 bg-gray-200 shadow-md rounded-lg relative"
      >
        {/* Wishlist Button */}
        <div
          onClick={likeToggleHandler}
          className="absolute top-1.5 right-1.5 bg-white w-7 h-7 rounded flex items-center justify-center cursor-pointer hover:shadow-md"
        >
          {isLoading ? <Spinner /> : isLiked ? <LikeFill /> : <Like />}
        </div>

        {/* Additional Information */}
        <p className="text-sm mb-1">{cat_prefix}</p>
        <p className="text-sm mb-2">Remaining Quantity: {currentRemainingQuantity}</p>
        {currentRemainingQuantity === 0 && (
          <p className="text-red-500 text-sm mb-2">You have reached the maximum quantity.</p>
        )}

        {/* Add to Cart Button */}
        <button
          disabled={isBtnDisabled || currentRemainingQuantity === 0}
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            isBtnDisabled || currentRemainingQuantity === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={addToCartHandler}
        >
          {isBtnDisabled ? (
            <div className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </div>
          ) : (
            "Add to Cart"
          )}
        </button>
      </ProductInfoComponent>
    </>
  );
};

export default memo(Product);
