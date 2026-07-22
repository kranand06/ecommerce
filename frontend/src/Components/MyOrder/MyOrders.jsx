import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const MyOrders = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${url}/api/order/myorders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data?.orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [url, token]);

  // Helper function to generate image URLs for both uploaded and static images
  // Assumes static images start with /images/, uploaded images start with /uploads/
  // and that backend serves uploads at `${url}/uploads/`
  const getImageurl = (image) => {
    return `${url}/images/${(image.startsWith("uploads"))?image.slice(8):image}`;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-orange-500 font-semibold text-lg">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-center px-4">
        <div className="text-6xl mb-4 select-none">🧡</div>
        <h2 className="text-2xl font-semibold text-orange-500 mb-2">No Orders Yet</h2>
        <p className="text-gray-600 mb-6 max-w-sm">
          You haven't placed any orders yet. Start shopping now to enjoy delicious meals delivered to your doorstep!
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6 sm:mb-8">My Orders</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md border border-orange-200 p-4 sm:p-6 flex flex-col"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
              <div className="text-gray-700 font-semibold mb-1 sm:mb-0">
                Order ID: <span className="font-normal break-words text-sm">{order._id}</span>
              </div>
              <div>
                <div className="text-gray-500 text-sm">
                  {new Date(order.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(order.date).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {order.payment ? (
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Paid
                </span>
              ) : (
                <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Pending
                </span>
              )}
              <span className="inline-block bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                {order.status}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <img
                src={getImageurl(order.items[0]?.image)}
                alt={order.items[0]?.title}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-orange-200 flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 mb-2">
                  {order.items.length} Item{order.items.length > 1 ? "s" : ""}
                </p>

                <div className="flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <span
                      key={item.foodId}
                      className="bg-orange-50 text-orange-600 px-2 py-1 rounded-full text-xs"
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-auto flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between border-t pt-4">
              <div className="font-bold text-orange-500 text-lg">
                Total: ₹{order.amount}
              </div>
              <Link
                to={`/myorders/${order._id}`}
                className="w-full sm:w-auto text-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold transition"
              >
                View Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
