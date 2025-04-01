import React from 'react'
import Food  from "./menu.js"

function FoodCard() {
  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {Food.map((item) => (
                    <div
                        key={item.id}
                        // onClick={() => handleInput("budget", item.title)}
                        className={`p-3 border rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200`}
                    >
                        <img className='w-full rounded-lg' src={item.image} alt="logo" />
                        <h2 className="font-bold text-xl mt-3">{item.title}</h2>
                        <h2 className="text-sm text-gray-500 mt-2">{item.desc}</h2>
                    </div>
                ))}
            </div>
    </>
  )
}

export default FoodCard