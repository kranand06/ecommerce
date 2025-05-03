import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";


function ListCard({ item, fetchList }) {

    const url = "http://localhost:3000";

    const imageUrl = `${url}/images/${(item.image.startsWith("uploads"))?item.image.slice(8):item.image}`;

    const handleDelete = async () => {
        try {
            const response = await axios.get(`${url}/api/food/delete/${item._id}`);
            if (response.status === 200) {
                // toast.success("Item deleted successfully! 🚀", { position: "bottom-right" });
                fetchList();
            }
            
            
        } catch (error) {
            console.error("Error deleting item:", error);
                  toast.error("Error deleting the Item! 🥲", { position: "bottom-right" });
            
            return;
            
        }
    }

    return (
        <div>
            <hr className='' />
            <div key={item.title} className="grid grid-cols-4 lg:grid-cols-5 items-center justify-center bg-white p-4 w-full my-3">

                <img src={imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                <h2 className="text-lg ">{item.title}</h2>
                <p className="text-gray-700 ">₹{item.price}</p>
                <p className="text-gray-700 hidden lg:flex ">{item.cat}</p>
                <div className="flex items-center mt-2">
                <button className="px-4 text-2xl py-2 bg-red-500 text-white rounded-md hover:scale-110 hover:translate-x-1 duration-300 transition-all" 
                 onClick={handleDelete} >
                        <MdDelete />
                    </button>
                </div>

            </div>
            <ToastContainer />

        </div>
    )
}

export default ListCard