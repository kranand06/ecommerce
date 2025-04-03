import React, { useEffect, useContext, useState } from 'react'
import { CartContext, AmountContext } from '../../App.jsx';

function Total() {

    const { total } = useContext(CartContext);
    const { amount, setAmount } = useContext(AmountContext);
    const [del, setDel] = useState(0);
    
  
  
  
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
    <div className="flex flex-col justify-between gap-2 p-4 w-full my-3">
        <hr />
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
  )
}

export default Total