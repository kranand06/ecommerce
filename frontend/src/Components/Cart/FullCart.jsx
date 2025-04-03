import React, { useContext } from 'react'
import CartItem from './CartItem'
import Total from './Total.jsx';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App.jsx';



function FullCart() {


  const navigate = useNavigate();
  const {setOpen} = useContext(UserContext);

  const handleSubmit = async () => {
    const user = localStorage.getItem("user");
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
      <div className='flex justify-center sm:justify-end items-center'>
      <button onClick={handleSubmit} className='px-5 py-3 text-lg font-medium bg-orange-500 text-white rounded-md hover:bg-orange-600 hover:scale-105 hover:translate-x-1 duration-300 transition-all' >
        PROCEED TO CHECKOUT
      </button>
      </div>
    </div>
  )
}

export default FullCart