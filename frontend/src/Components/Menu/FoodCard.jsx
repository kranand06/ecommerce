import React, { useState, useContext } from 'react';
import { MenuContext } from '../../App.jsx';
import ItemCount from './ItemCount.jsx'

function FoodCard({ category }) {

      const { Food } = useContext(MenuContext);


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 pb-3 " >
        {Food.map((item) => (
          <div
            key={item.id}
            className={`p-3  rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 ${category === "View All" ? "" : (item.cat === category ? "" : "hidden")
              }`}          >
            <img className='w-full rounded-lg' src={item.image} alt="logo" />
            <h2 className="font-bold text-xl mt-3">{item.title}</h2>
            <h2 className="text-sm text-gray-500 mt-2">{item.desc}</h2>
            <ItemCount title={item.title} price={item.price} />
          </div>
        ))}
      </div>
    </>
  )
}

export default FoodCard