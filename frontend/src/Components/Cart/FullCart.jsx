import React from 'react'
import CartItem from './CartItem'
import { Link } from 'react-router-dom';
import Total from './Total.jsx';


function FullCart() {



  return (
    <div className=''>
      <CartItem />
      <Total />
      <div className='flex justify-center sm:justify-end items-center'>
      <Link to="/order" className='px-5 py-3 text-lg font-medium bg-orange-500 text-white rounded-md hover:bg-orange-600 hover:scale-105 hover:translate-x-1 duration-300 transition-all' >
        PROCEED TO CHECKOUT
      </Link>
      </div>
    </div>
  )
}

export default FullCart