import React, { useContext } from 'react'
import CartItem from './CartItem'
import Total from './Total.jsx';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext.jsx';
import { CartContext } from '../context/CartContext.jsx';



function FullCart() {


  const navigate = useNavigate();
  const { setOpen, user } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);

  const handleSubmit = async () => {
    if (!user) {
      setOpen(true);
      return;
    }
    navigate("/order");
  }


  return (
    <div className=''>
      <CartItem />
      <Total />
      <div className='px-8 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between sm:items-center'>
        <button
          onClick={clearCart}
          className='px-5 py-3 text-lg font-medium bg-black text-white rounded-md hover:scale-105 hover:translate-x-1 duration-300 transition-all'
        >
          CLEAR CART
        </button>

        <button
          onClick={handleSubmit}
          className='px-5 py-3 text-lg font-medium bg-orange-500 text-white rounded-md hover:bg-orange-600 hover:scale-105 hover:translate-x-1 duration-300 transition-all'
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  )
}

export default FullCart