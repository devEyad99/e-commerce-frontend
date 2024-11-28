// import { TProducts } from "../../../types/product";
// import { useAppDispatch } from "../../../store/hooks";
// import { actPlaceOrder } from "../../../store/orders/orderSlice";
// import { useState } from "react";



// type CartSubtotalPriceProps = {
//    products: TProducts[];
//    userAccessToken: string | null;
//   };


// export default function CartSubtotalPrice({ products, userAccessToken }: CartSubtotalPriceProps) {

//   const dispatch = useAppDispatch();
//   const [showModal, setShowModal] = useState(false);


//   const subTotal = products.reduce((acc, product) => {
//     return acc + product.price * (product.quantity ?? 0)
//   }, 0);

//   const modalHandler = () => {
//     setShowModal(!showModal);
//   };

//   const placeOrderHandler = () => {
//     dispatch(actPlaceOrder(subTotal));
//   }
  
//   return (
//     <>
//      <div className="flex justify-between mb-14">
//       <span className="block text-lg font-bold">Subtotal:</span>
//       <span className="block text-lg font-bold">{subTotal.toFixed(2)} EGP</span>
//     </div>

//     {userAccessToken && <div className="flex justify-between mb-14">
//       <span className="block text-lg font-bold"></span>
//       <span className="block text-lg font-bold">
//         <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
//           Place Order  
//         </button>
//       </span>
//     </div>}
//     </>
//   );
// }


import { TProducts } from "../../../types/product";
import { useAppDispatch } from "../../../store/hooks";
import { actPlaceOrder } from "../../../store/orders/orderSlice";
import { useState } from "react";
import { cleanCartAfterPlaceOrder } from "../../../store/cart/cartSlice";

type CartSubtotalPriceProps = {
  products: TProducts[];
  userAccessToken: string | null;
};

export default function CartSubtotalPrice({
  products,
  userAccessToken,
}: CartSubtotalPriceProps) {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subTotal = products.reduce((acc, product) => {
    return acc + product.price * (product.quantity ?? 0);
  }, 0);

  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null); // Reset error on modal toggle
  };

  const placeOrderHandler = () => {
      setLoading(true);
      setError(null); // Clear any existing errors
     dispatch(actPlaceOrder(subTotal))
     .unwrap()
      .then(() => { 
        dispatch(cleanCartAfterPlaceOrder());
        setLoading(false);
        setShowModal(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* Subtotal Display */}
      <div className="flex justify-between mb-14">
        <span className="block text-lg font-bold">Subtotal:</span>
        <span className="block text-lg font-bold">
          {subTotal.toFixed(2)} EGP
        </span>
      </div>

      {/* Place Order Button */}
      {userAccessToken && (
        <div className="flex justify-end mb-14">
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            onClick={modalHandler}
          >
            Place Order
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            showModal ? "visible opacity-100" : "invisible opacity-0"
          } transition-opacity duration-300`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-semibold">Placing Order</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={modalHandler}
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <p>
                Are you sure you want to place order with Subtotal:{" "}
                <strong>{subTotal.toFixed(2)} EGP</strong>
              </p>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <div className="flex justify-end border-t p-4 gap-2">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={modalHandler}
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                onClick={placeOrderHandler}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
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
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
