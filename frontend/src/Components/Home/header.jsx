import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';


const Header = () => {
  return (
    <>
      <div className='bg-[url(/header_img.png)] h-[600px] bg-cover bg-center my-10 rounded-lg relative'>
        <div className='absolute flex flex-col items-start lg:max-w-[50%] text-white bottom-10 left-4 md:left-10 gap-5'>
          <h2 className='text-6xl font-extrabold font-inter' >Order your favourite food right now!</h2>
          <p className='hidden sm:flex text-xl font-medium font-inter'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
          <NavLink to="/menu"><button className='px-6 py-3 rounded-full text-md bg-white text-black hover:underline hover:underline-offset-2 duration-300'>View menu</button>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Header