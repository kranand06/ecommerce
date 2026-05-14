import React, { useContext, useEffect } from "react";
import ItemCount from './ItemCount.jsx'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { MenuContext } from "../../App.jsx";



function FoodCard({ category }) {

  const url = import.meta.env.VITE_BACKEND_URL;

    const { food, setFood } = useContext(MenuContext);

  const getImageurl = (image) => {
    return `${url}/images/${(image.startsWith("uploads"))?image.slice(8):image}`;
  }


  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.status === 200) {
        setFood(response.data);
        toast.success("Menu fetched successfully! 🚀", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error("Error fetching Menu! 🥲", { position: "bottom-right" });
    }
  }

  useEffect(() => {
    fetchMenu();
  }, [])


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 pb-3 " >
      {food.length > 0 ? (
        food.map((item) => (
          
          <div
            key={item._id}
            className={`p-3  rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 ${category === "View All" ? "" : (item.cat === category ? "" : "hidden")
              }`}   
              >
            <img className='w-full rounded-lg' src={getImageurl(item.image)} alt={item.title} />
            <h2 className="font-bold text-xl mt-3">{item.title}</h2>
            <h2 className="text-sm text-gray-500 mt-2">{item.desc}</h2>
            <ItemCount item={item} />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No items found.</p>
      )}
      </div>
      <ToastContainer />
    </>
  )
}

export default FoodCard