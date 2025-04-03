import React from 'react'
import Header from './header'



const Home = () => {
  return (
    <div className=' px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 gap-12 '>
    <Header />
    <div className='flex flex-col items-center justify-center text-center mt-10'>
    <h1 className='text-4xl flex font-semibold'> <span className='text-orange-500 '> Order&nbsp; </span>
     करूँ झट भर,&nbsp; <span className='text-orange-500 '>Menu &nbsp;</span> देखूँ रात भर।</h1>
    </div>
    </div>
  )
}

export default Home