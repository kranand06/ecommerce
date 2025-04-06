import React from 'react'



const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start mt-10 sm:mt-0 sm:justify-center px-4 w-full">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome, Admin!
        </h1>
        <p className="text-lg text-gray-600">
          This is the admin panel for <span className="font-semibold text-yellow-600">Anand Restro</span>.
        </p>
        <p className="mt-2 text-sm text-gray-500">Manage your orders, menu, and customers from here.</p>
      </div>
    </div>
  )
}

export default Home