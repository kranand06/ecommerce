import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoFastFoodOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaList } from "react-icons/fa6";




function Sidebar() {
    return (
        <div className='p-2 h-[100vh] sm:w-60 md:w-64 lg:w-72 xl:w-80
        left-0 overflow-y-auto border-r-2 border-gray-200 bg-white shadow-lg flex flex-col gap-10'>

            <div className='flex flex-col gap-10 p-5 justify-center items-center sm:items-start'>
            <NavLink to="/orders" className={({ isActive }) => ` ${(isActive == true) ? "text-orange-400" : "text-gray-700"} hover:text-orange-400 hover:scale-110 duration-300 `}>

                    <div className='flex flex-row gap-2 items-center hover:text-orange-500 hover:scale-110 hover:translate-x-2 transition-all duration-300'>
                        <IoFastFoodOutline className='text-3xl' />
                        <h1 className="hidden sm:inline text-base md:text-lg lg:text-xl xl:text-2xl font-semibold">
                            Orders
                        </h1>
                    </div>
                </NavLink>
                <NavLink to="/list" className={({ isActive }) => ` ${(isActive == true) ? "text-orange-400" : "text-gray-700"} hover:text-orange-400 hover:scale-110 duration-300 `}>
                <div className='flex flex-row gap-2 items-center hover:text-orange-500 hover:scale-110 hover:translate-x-2 transition-all duration-300'>
                        <FaList className='text-3xl' />
                        <h1 className="hidden sm:inline text-base md:text-lg lg:text-xl xl:text-2xl font-semibold">List Items</h1>
                    </div>
                </NavLink>
                <NavLink to="/add" className={({ isActive }) => ` ${(isActive == true) ? "text-orange-400" : "text-gray-700"} hover:text-orange-400 hover:scale-110 duration-300 `}>
                <div className='flex flex-row gap-2 items-center hover:text-orange-500 hover:scale-110 hover:translate-x-2 transition-all duration-300'>
                        <IoMdAddCircleOutline className='text-3xl' />

                        <h1 className="hidden sm:inline text-base md:text-lg lg:text-xl xl:text-2xl font-semibold">Add Items</h1>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar