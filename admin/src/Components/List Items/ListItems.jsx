import React, { use } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function ListItems() {


  const url = "http://localhost:3000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.status === 200) {
        setList(response.data);
        toast.success("List fetched successfully! 🚀", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error("Error fetching list! 🥲", { position: "bottom-right" });
    }
  }

  useEffect(() => {
    fetchList();
  }, [])




  return (
    <div>
      {/* <button onClick={fetchList}>fetching</button> */}

      <ToastContainer />
    </div >
  )
}

export default ListItems