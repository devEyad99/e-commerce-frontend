

import { Heading } from "../components/common";
import { Loading } from "../components/feedback";
import { ProductInfo } from "../components/eCommerce";
import useOrders from "../hooks/useOrders";

export default function Orders() {

  const {
    orderList,
    loading,
    error,
    showModal,
    selectedProduct,
    viewDetailsHandler,
    closeModalHandler,
  } = useOrders();

  return (
    <>
      {/* Modal */}
      {showModal && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
    role="dialog"
    aria-modal="true"
  >
    <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/5 md:w-2/5">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-md font-semibold">Products Details</h2>
        <button
          onClick={closeModalHandler}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
      </div>
      {/* Scrollable Modal Body */}
      <div className="p-4 max-h-[50vh] overflow-y-auto">
        {selectedProduct.map((el) => (
          <ProductInfo
            key={el.id}
            title={el.title}
            img={el.img}
            price={el.price}
            quantity={el.quantity || 0}
            direction="column"
            style="mb-4"
          />
        ))}
      </div>
      <div className="flex justify-end p-3 border-t">
        <button
          onClick={closeModalHandler}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      <Heading title="My Orders" />
      <Loading loading={loading} error={error} type="tabel">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Order Number</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Items</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">#{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.items.length} item(s)
                    {" / "}
                    <span
                      onClick={() => {
                        viewDetailsHandler(Number(order.id));
                      }}
                      className="text-blue-500 underline cursor-pointer"
                    >
                      Product Details
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{order.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Loading>
    </>
  );
}
