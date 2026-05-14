import React, { useState,useContext} from 'react'
import { CartContext } from '../context/CartContext';



function ItemCount({item}) {

    const { cart, setCart, addToCart, removeFromCart } = useContext(CartContext);
    const count = cart[item._id] || 0;
    const [itemCount, setItemCount] = useState(count);


  return (
    <div className="flex items-center justify-between w-full mt-4 px-2">
              {/* <span className="text-xl  text-orange-600">₹{price}</span> */}

              {count === 0 ? (
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-md  hover:bg-orange-600 transition"
                  onClick={() => {
                    addToCart(item._id);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    onClick={() => {
                        removeFromCart(item._id);
                      }}
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">{count}</span>
                  <button
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    onClick={() => {
                        addToCart(item._id);
                      }}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
  )
}
export default ItemCount