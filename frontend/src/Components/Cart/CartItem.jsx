import React, { useContext, useEffect } from "react";
import { MenuContext, CartContext } from "../../App.jsx";

function CartItem() {
  const { Food } = useContext(MenuContext);
  const { cart, setCart, total, setTotal} = useContext(CartContext);


  useEffect(() => {
    const newTotal = Food.reduce((sum, item) => {
      if (cart[item.title]) {
        return sum + item.price * cart[item.title];
      }
      return sum;
    }, 0);
    setTotal(newTotal);
  }, [cart, Food]);

  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-5 items-center p-4 w-full my-3">
        <div></div>
        <h1 className="text-md">Item Name</h1>
        <h1 className="text-md">Item Price</h1>
        <h1 className="text-md">Quantity </h1>
        <h1 className="text-md">Subtotal </h1>
      </div>
      <hr className="my-3" />
      {Food.map((item) => {
        if (cart[item.title]) {
          return (
            <div key={item.title} className="grid grid-cols-3 lg:grid-cols-5 items-center bg-white shadow-md rounded-lg p-4 w-full my-3">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-md" />

              <h2 className="text-lg ">{item.title}</h2>
              <p className="text-gray-700 ">₹{item.price}</p>
              <div className="flex items-center mt-2">
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    onClick={() => {
                    setCart((prevCart) => {
                      const updatedCart = { ...prevCart };
                      if (updatedCart[item.title] > 1) {
                        updatedCart[item.title] -= 1;
                      } else {
                        delete updatedCart[item.title];
                      }
                      return updatedCart;
                    });
                  }}
                >
                  -
                </button>
                <span className="mx-3 text-lg">{cart[item.title]}</span>
                <button
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    onClick={() => {
                    setCart((prevCart) => ({
                      ...prevCart,
                      [item.title]: prevCart[item.title] + 1,
                    }));
                  }}
                >
                  +
                </button>
              </div>
              <p className="text-gray-700 ">₹{item.price * cart[item.title]}</p>

            </div>
          );
        }
        return null;
      })}

    </div>
  );
}

export default CartItem;