import React from 'react'
import Menu from './Menu.jsx'

function MenuPage() {
  return (
    <div className='min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 gap-12 '>
      <h1 className='text-4xl font-semibold my-5'>Explore our menu...</h1>
      <p className=' text-gray-500'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <Menu />

    </div>
  )
}

export default MenuPage