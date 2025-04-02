import React from 'react'

function CartPage() {
  return (
    <div className='min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 gap-12 '>
        <h1 className='text-2xl font-bold text-gray-700'>Your Cart</h1>
        <p className='text-gray-500'>Review your selected items before proceeding to checkout.</p>
        <div className='flex flex-col items-center justify-center mt-8'>
            <img src="/empty-cart.png" alt="Empty Cart" className='w-1/2 h-auto' />
            <h2 className='text-lg text-gray-500 mt-4'>Your cart is currently empty.</h2>
            <p className='text-gray-400'>Browse our menu and add items to your cart!</p>
        </div>
    </div>
  )
}

export default CartPage