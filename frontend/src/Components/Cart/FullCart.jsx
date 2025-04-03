import React, { useEffect, useContext, useState } from 'react'
import { CartContext, AmountContext } from '../../App.jsx';
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom';


function FullCart() {

  const { total } = useContext(CartContext);
  const { amount, setAmount } = useContext(AmountContext);

  const [del, setDel] = useState(0);
  
  const navigate = useNavigate();


  useEffect(() => {
    if(total<500){
      setDel(50);
    }
    else{
      setDel(0);
    }
    setAmount(total + del);
  }, [total,del]);


  return (
    <div className=''>
      <CartItem />
      <div className="flex flex-col justify-between gap-2 p-4 w-full my-3">
        <div className="flex justify-between w-full p-4">
          <h2 className="text-lg ">Sub-Total : </h2>
          <p className="text-lg text-gray-700 ">₹ {total}</p>
        </div>
        <hr />
        <div className="flex justify-between w-full p-4">
          <h2 className="text-lg ">Delivery Charges : </h2>
          <p className="text-lg text-gray-700 ">₹ {del}</p>
        </div>
        <hr />
        <div className="flex justify-between w-full p-4">
          <h2 className="text-lg font-bold">Total Amount : </h2>
          <p className=" text-lg text-gray-700 font-bold">₹ {amount}</p>
        </div>
      </div>
      <div className='flex justify-center sm:justify-end items-center'>
      <button onclick={()=>navigate('/order')} className="px-5 py-3 text-lg font-medium bg-orange-500 text-white rounded-md hover:bg-orange-600">
        Proceed to Checkout
      </button>
      
      </div>
    </div>
  )
}

export default FullCart