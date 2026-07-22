import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import OrderTotal from './OrderTotal';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext.jsx';
import Login from '../Login/Login';
import { AmountContext } from '../../App.jsx';
import { CartContext } from '../context/CartContext.jsx';
import axios from 'axios';



function OrderPage() {

  const navigate = useNavigate();
  const [Formdata, setFormdata] = useState([]);

    const {setOpen} = useContext(UserContext);
    const { amount } = useContext(AmountContext);
  

  const handleInput = (type, data) => {
    setFormdata({
      ...Formdata,
      [type]: data
    })
  }

  const validateForm = () => {
    if (!Formdata.name1 || !Formdata.name2 || !Formdata.phone  || !Formdata.street || !Formdata.city || !Formdata.state || !Formdata.pincode) {
      toast.error("Please fill all the fields! 🥲", { position: "bottom-right" });
      return false;
    }
    if (Formdata.phone.length != 10) {
      toast.error("Please enter a valid Phone Number! 🥲", { position: "bottom-right" });
      return false;
    }
    if (Formdata.pincode.length != 6) {
      toast.error("Please enter a valid Pincode! 🥲", { position: "bottom-right" });
      return false;
    }
    return true;
  }

  const handleSubmit = async () => {

    const token = localStorage.getItem("token");
    if (!token) {
      setOpen(true);
      return;
    }

    // if (!validateForm()) {
    //   // return;
    // }

    try {

    // Step 1: Create Razorpay Order
    const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    console.log(data);

    // Step 2: Configure Razorpay
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: "Anand Restro",
        description: "Food Order",
        order_id: data.id,

        handler: async function (response) {
            const verify = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`,
                {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    address: Formdata,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (verify.data.success) {
                toast.success("Payment Successful 🎉");
                navigate("/placed", { state: { order: verify.data.order } });
            } else {
                toast.error("Payment Verification Failed");
            }
        },

        prefill: {
            name: `${Formdata.name1} ${Formdata.name2}`,
            email: Formdata.mail,
            contact: Formdata.phone,
        },

        theme: {
            color: "#ff6b00",
        },
    };

    // Step 3: Open Razorpay Checkout
    const razorpay = new window.Razorpay(options);
    razorpay.open();

} catch (error) {
    console.log(error);
    toast.error("Something went wrong");
}
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
          {/* <div>
            <input required type="mail" name="mail" id="mail" placeholder="Email Id"
              onChange={(e) => { handleInput("mail", e.target.value) }}
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-indigo-600 transition-all sm:text-lg"
            />
          </div> */}
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
        <Login />

      </div>
    </div>


  )
}

export default OrderPage