import React, { useContext, useEffect } from "react";
import { MenuContext } from "../../App.jsx";
import { CartContext } from "../context/CartContext.jsx";

function CartItem() {
  const { food } = useContext(MenuContext);

  const {
    cart,
    total,
    setTotal,
    addToCart,
    removeFromCart,
  } = useContext(CartContext);

  const url = import.meta.env.VITE_BACKEND_URL;

  const cartItems = food.filter((item) => cart[item._id]);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => {
      return sum + item.price * cart[item._id];
    }, 0);

    setTotal(newTotal);
  }, [cart, food]);

  if (!cart || Object.keys(cart).length === 0) {
    return (
      <div className="text-center py-10 text-xl text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-5 items-center p-4 w-full my-3 font-semibold">
        <div>Item</div>
        <div>Name</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
      </div>

      <hr className="my-3" />

      {cartItems.map((item) => {
        const quantity = cart[item._id];

        const imageUrl = `${url}/images/${
          item.image.startsWith("uploads")
            ? item.image.slice(8)
            : item.image
        }`;

        return (
          <div
            key={item._id}
            className="grid grid-cols-5 items-center bg-white shadow-md rounded-lg p-4 w-full my-3"
          >
            <img
              src={imageUrl}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-md"
            />

            <h2 className="text-lg">{item.title}</h2>

            <p>₹{item.price}</p>

            <div className="flex items-center gap-3">
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => removeFromCart(item._id)}
              >
                -
              </button>

              <span className="text-lg">{quantity}</span>

              <button
                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                onClick={() => addToCart(item._id)}
              >
                +
              </button>
            </div>

            <p>₹{item.price * quantity}</p>
          </div>
        );
      })}

      <div className="text-right mt-6 text-2xl font-bold">
        Total: ₹{total}
      </div>
    </div>
  );
}

export default CartItem;