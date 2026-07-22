import { CheckCircle, Package, MapPin, Receipt } from "lucide-react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const order = state?.order;
  console.log(order);

  if (!order) {
    return <Navigate to="/" replace />;
  }
    const url = import.meta.env.VITE_BACKEND_URL;
  const getImageurl = (image) => {
    return `${url}/images/${(image.startsWith("uploads"))?image.slice(8):image}`;
  }

  return (
    <div className="min-h-screen flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* Success Banner */}
        <div className="bg-green-600 text-white text-center py-10">

          <CheckCircle size={70} className="mx-auto mb-4" />

          <h1 className="text-3xl font-bold">

            Order Placed Successfully!

          </h1>

          <p className="mt-3 text-green-100">

            Thank you! Your delicious food is being prepared.

          </p>

        </div>

        <div className="p-8 space-y-8">

          {/* Order Info */}
          <section>
            <h2 className="font-bold text-xl flex items-center gap-2 mb-4">
              <Receipt size={22} />
              Order Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-gray-700">

              <div>
                <span className="font-semibold">
                  Order ID:
                </span>
                <br />
                {order._id}
              </div>

              <div>
                <span className="font-semibold">
                  Date:
                </span>
                <br />
                {new Date(order.date).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>

              <div>
                <span className="font-semibold">
                  Payment:
                </span>
                <br />
                Paid
              </div>

             <div>

                <span className="font-semibold">

                  Status:

                </span>

                <br />

                <span className="text-green-600 font-semibold">

                  {order.status}

                </span>

              </div>

            </div>

          </section>

          {/* Delivery Address */}

          <section>

            <h2 className="font-bold text-xl flex gap-2 items-center mb-4">
              <MapPin size={22} />
              Delivery Address
            </h2>

            <div className="bg-gray-100 rounded-2xl p-5 border border-gray-200 leading-7">
              <p className="font-semibold text-lg">
                {order.address.name1} {order.address.name2}
              </p>
              <p>{order.address.mail}</p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
              <p>Contact : {order.address.phone}</p>
            </div>

          </section>

          {/* Items */}

          <section>

            <h2 className="font-bold text-xl flex items-center gap-2 mb-4">
              <Package size={22} />
              Items Ordered
            </h2>

            <div className="space-y-4">

              {order.items.map((item) => (

                <div
                  key={item.foodId}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
                >
                  
                    <img
                      src={getImageurl(item.image)}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-xl border"
                    />

                    <div>
                      <p className="font-semibold text-lg">{item.title}</p>
                      <p className="text-gray-500 mt-1">Quantity: {item.quantity}</p>
                      <p className="text-orange-500 font-semibold mt-2">₹{item.price} each</p>
                    </div>
                  

                  <p className="hidden sm:flex font-bold text-lg">₹{item.price * item.quantity}</p>
                </div>

              ))}

            </div>

          </section>

          {/* Total */}

          <div className="border-t pt-6">

            <div className="flex justify-between text-xl font-bold">

              <span>Total Paid</span>

              <span className="text-orange-500">
                ₹{order.amount}
              </span>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-4">

            <button
              onClick={() =>
                navigate(`/myorders/${order._id}`)
              }
              className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-semibold transition hover:bg-orange-600"
            >
              View This Order
            </button>

            <button
              onClick={() => navigate("/myorders")}
              className="flex-1 py-3 border border-orange-500 text-orange-500 rounded-xl font-semibold transition hover:bg-orange-50"
            >
              My Orders
            </button>

          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full text-center text-orange-500 font-semibold hover:underline"
          >
            Continue Shopping →
          </button>

        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;