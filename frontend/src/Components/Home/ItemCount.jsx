import React, { useState,useContext} from 'react'
import { CartContext } from '../../App.jsx';


function ItemCount({title,price}) {

    const [count, setCount] = useState(0);
    const value = useContext(CartContext);


  return (
    <div className="flex items-center justify-between w-full mt-4 px-2">
              <span className="text-xl  text-orange-600">₹{price}</span>

              {count === 0 ? (
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-md  hover:bg-orange-600 transition"
                  onClick={() => {
                    setCount(count + 1);
                    value.setCart((prevCart) => ({
                        ...prevCart,
                        [title]: 1,
                    }));
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    onClick={() => {
                        setCount(count - 1);
                        value.setCart((prevCart) => {
                          const updatedCart = { ...prevCart };
                          if (updatedCart[title] > 1) {
                            updatedCart[title] -= 1;
                          } else {
                            delete updatedCart[title]; 
                          }
                          return updatedCart;
                        });
                      }}
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">{count}</span>
                  <button
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    onClick={() => {
                        setCount(count + 1);
                        value.setCart((prevCart) => ({
                            ...prevCart,
                            [title]: prevCart[title] + 1,
                        
                        }));
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