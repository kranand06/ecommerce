import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const url = import.meta.env.VITE_BACKEND_URL;

const getImageurl = (image) => {
    return `${url}/images/${(image.startsWith("uploads"))?image.slice(8):image}`;
  }

const statusColor = {
  Pending: 'bg-orange-200 text-orange-700',
  Processing: 'bg-orange-300 text-orange-800',
  Shipped: 'bg-orange-400 text-white',
  Delivered: 'bg-green-200 text-green-700',
  Cancelled: 'bg-red-200 text-red-700',
};

const paymentColor = {
  Paid: 'bg-green-100 text-green-700',
  Unpaid: 'bg-red-100 text-red-700',
  Failed: 'bg-red-100 text-red-700',
};

const OrderDetails = () => {
  const { id: orderId } = useParams();
  console.log("Order ID from params:", orderId); // Debugging line
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${url}/api/order/myorders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data.order);
      } catch (err) {
        setError('Order not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
    // eslint-disable-next-line
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-orange-500 font-semibold">Loading order details...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="text-2xl font-semibold text-orange-600">Order Not Found</div>
        <div className="text-gray-500">We couldn't find the order you're looking for.</div>
        <button
          className="px-6 py-2 rounded-lg border-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition"
          onClick={() => navigate('/orders')}
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const {
    _id,
    payment,
    paymentId,
    status,
    amount,
    address = {},
    items = [],
  } = order;

  const orderDate = order.date ? new Date(order.date) : null;

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = amount - cartTotal;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Top Section */}
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-orange-500 hover:text-orange-700 font-medium mr-4"
          onClick={() => navigate('/myorders')}
        >
          <span className="text-2xl mr-1">←</span> My Orders
        </button>
        <h1 className="text-2xl font-bold flex-1 text-center">Order Details</h1>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl shadow mb-6 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-gray-400 text-xs mb-1">Order ID</div>
            <div className="font-mono text-sm mb-2">{_id}</div>
            <div className="flex items-center space-x-4 text-sm">
              <div>
                <span className="text-gray-400">Date: </span>
                {orderDate && orderDate.toLocaleDateString('en-IN', { dateStyle: 'full' })}
              </div>
              <div>
                <span className="text-gray-400">Time: </span>
                {orderDate && orderDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-gray-400 text-xs text-right">Total Amount</div>
            <div className="text-3xl font-bold text-orange-500 text-right">
              ₹{amount}
            </div>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="bg-white rounded-2xl shadow mb-6 p-6">
        <h2 className="text-lg font-semibold text-orange-600 mb-4">
          Order Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-orange-100 rounded-xl p-4 bg-orange-50">
            <p className="text-sm text-gray-500 mb-2">Food Status</p>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${statusColor[status] || 'bg-orange-100 text-orange-700'}`}
            >
              {status}
            </span>
          </div>

          <div className="border border-orange-100 rounded-xl p-4 bg-orange-50">
            <p className="text-sm text-gray-500 mb-2">Payment Status</p>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${payment ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {payment ? 'Paid' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white rounded-2xl shadow mb-6 p-6">
        <div className="text-lg font-semibold mb-3 text-orange-600">Delivery Address</div>
        <div className="text-sm space-y-1">
          <div>
            <span className="font-medium">{address.name1} {address.name2}</span>
          </div>
          <div>
            <span className="text-gray-500">Phone: </span>{address.phone}
          </div>
          <div>
            <span className="text-gray-500">Street: </span>{address.street}
          </div>
          <div>
            <span className="text-gray-500">City: </span>{address.city}, {address.state} - {address.pincode}
          </div>
        </div>
      </div>

      {/* Ordered Items */}
      <div className="bg-white rounded-2xl shadow mb-6 p-6">
        <div className="text-lg font-semibold mb-3 text-orange-600">Ordered Items</div>
        <div>
          {items.map((item, idx) => (
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
                    <p className="text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-orange-500 font-semibold mt-2">
                      ₹{item.price} each
                    </p>
                  </div>

                  <p className="hidden sm:flex font-bold text-lg">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
          ))}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-white rounded-2xl shadow mb-8 p-6">
        <div className="text-lg font-semibold mb-3 text-orange-600">Payment Summary</div>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="font-medium">
              {deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}
            </span>
          </div>
          <div className="border-t border-gray-100 my-2" />
          <div className="flex justify-between font-bold text-base">
            <span>Total Paid</span>
            <span className="text-orange-500">₹{amount}</span>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-end gap-4">
        
        <button
          className="w-full md:w-auto px-8 py-3 rounded-2xl border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-50 transition"
          onClick={() => navigate('/myorders')}
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;