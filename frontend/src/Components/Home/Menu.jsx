import React, { useState } from 'react'
import { Category } from "./menu.js"
import FoodCard from './FoodCard.jsx'


function Menu() {

    const [category, setCategory] = useState("View All")


    return (
        <>
            <h1 id='menu' className='mt-5 text-2xl font-medium'>Choose from categories...</h1>
            <div className="flex  gap-8 mt-5 items-center pb-5 overflow-x-auto overflow-y-hidden whitespace-nowrap max-w-full">
                {Category.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => {
                            setCategory(item.title)
                        }}
                        className={`w-48 p-3 cursor-pointer hover:shadow-xl rounded-xl transition-all duration-200 flex-shrink-0 ${category === item.title ? "border-4 border-orange-500  " : ""} `}
                    >
                        <img className="rounded-full aspect-square object-cover" src={item.image} alt="logo" />
                        <h2 className="text-lg mt-3 text-center">{item.title}</h2>
                    </div>
                ))}
            </div>


            <hr className='my-5' />
            <h1 className='mt-10 text-3xl font-semibold'>Top Dishes near you.</h1>
            <FoodCard category={category} />

        </>
    )
}

export default Menu