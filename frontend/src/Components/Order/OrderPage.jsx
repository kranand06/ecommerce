import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Signin from '../Signin';
import OrderTotal from './OrderTotal';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App';



function OrderPage() {

  const navigate = useNavigate();
  const [Formdata, setFormdata] = useState([]);

    const {setOpen} = useContext(UserContext);
  

  const handleInput = (type, data) => {
    setFormdata({
      ...Formdata,
      [type]: data
    })
  }

  const handleSubmit = async () => {

    const user = localStorage.getItem("user");
    if (!user) {
      setOpen(true);
      return;
    }

    if (!Formdata.name1 || !Formdata.name2 || !Formdata.phone || !Formdata.mail || !Formdata.street || !Formdata.city || !Formdata.state || !Formdata.pincode) {
      console.log(Formdata);
      toast.error("Please fill all the fields! 🥲", { position: "bottom-right" });
      return;
    }
    if (Formdata.phone.length != 10) {
      toast.error("Please enter a valid Phone Number! 🥲", { position: "bottom-right" });
      return;
    }
    if (Formdata.pincode.length != 6) {
      toast.error("Please enter a valid Pincode! 🥲", { position: "bottom-right" });
      return;
    }
    toast.success("Submitted Successfully! 🚀", { position: "bottom-right" });
    console.log(Formdata);
    navigate("/placed");
  }


  return (
    <div className='min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 gap-12 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-20 items-center justify-items-center'>  
        <div className="flex flex-col gap-3 mt-14">
          <h1 className='text-2xl my-5 font-medium'>Please Fill you details :</h1>

          <div className='flex flex-row gap-3'>
            <input required type="text" name="name1" id="name1" placeholder="First Name"
              onChange={(e) => { handleInput("name1", e.target.value) }}
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 transition-all sm:text-lg"
            />
            <input required type="text" name="name2" id="name2" placeholder="Last Name"
              onChange={(e) => { handleInput("name2", e.target.value) }}
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 transition-all sm:text-lg"
            />
          </div>

          <div>
            <input required pattern="\d{10}" maxlength="10" type="number" name="phone" id="phone" placeholder="Phone No."
              onChange={(e) => { handleInput("phone", e.target.value) }}
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 transition-all sm:text-lg"
            />
          </div>
          <div>
            <input required type="mail" name="mail" id="mail" placeholder="Email Id"
              onChange={(e) => { handleInput("mail", e.target.value) }}
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 transition-all sm:text-lg"
            />
          </div>
          <div>
            <input required type="text" name="street" id="street" placeholder="Street Address"
              onChange={(e) => { handleInput("street", e.target.value) }}
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 transition-all sm:text-lg"
            />
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <input required type="text" name="city" id="city" placeholder="City"
              onChange={(e) => { handleInput("city", e.target.value) }}
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 transition-all sm:text-lg"
            />
            <input required type="text" name="state" id="state" placeholder="State"
              onChange={(e) => { handleInput("state", e.target.value) }}
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 transition-all sm:text-lg"
            />
            <input required pattern="\d{6}" maxlength="6" type="number" name="pincode" id="pincode" placeholder="Pincode"
              onChange={(e) => { handleInput("pincode", e.target.value) }}
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 transition-all sm:text-lg"
            />

          </div>
        </div>
        <OrderTotal />
      </div>
      <div className="flex justify-center mb-16">
        <button
          onClick={handleSubmit} size='large' className="my-10 px-5 py-3 text-lg font-medium bg-orange-500 text-white rounded-md hover:bg-orange-600 hover:scale-105 hover:translate-x-1 duration-300 transition-all"
          variant="contained" >
          PROCEED FOR PAYMENT
        </button>

        <ToastContainer />
        <Signin />

      </div>
    </div>


  )
}

export default OrderPage