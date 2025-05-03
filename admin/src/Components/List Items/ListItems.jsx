import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ListCard from './ListCard';

function ListItems() {


  const url = "http://localhost:3000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.status === 200) {
        setList(response.data);
        // toast.success("List fetched successfully! 🚀", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error("Error fetching list! 🥲", { position: "bottom-right" });
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  const handleDelete = async (itemId) => {
          try {
              const response = await axios.get(`${url}/api/food/delete/${itemId}`);
              if (response.status === 200) {
                  toast.success("Item deleted successfully! 🚀", { position: "bottom-right" });
                  fetchList();
              }
              
              
          } catch (error) {
              console.error("Error deleting item:", error);
                    toast.error("Error deleting the Item! 🥲", { position: "bottom-right" });
              
              return;
              
          }
      }




  return (
    <div className='w-full p-4 pt-0 h-[100vh] overflow-y-scroll'>
      <div className="grid grid-cols-4 lg:grid-cols-5 items-center justify-center p-4  w-full mb-3 text-lg sticky top-0 bg-white z-10">
                <h1 className="text-md">Image</h1>
                <h1 className="text-md">Item Name</h1>
                <h1 className="text-md">Item Price</h1>
                <h1 className="text-md hidden lg:flex">Category </h1>
                <h1 className="text-md">Delete </h1>
            </div>
      {list.length > 0 ? (
        list.map((item) => (
          <ListCard key={item._id} item={item} fetchList={fetchList} />
        ))
      ) : (
        <p className="text-center text-gray-500">No items found.</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default ListItems;