import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../App';
import { useNavigate } from "react-router-dom";
import axios from 'axios';




const AddItemForm = () => {

  const url = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();
    const { setOpen } = useContext(UserContext);

    const [image, setImage] = useState(null);


    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        cat: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = localStorage.getItem("user");
        if (!user) {
            setOpen(true);
            return;
        }

        if (image === null) {
            toast.error("Please upload an image.! 🥲", { position: "bottom-right" });
            return;
        }
        if (!formData.title || !formData.desc || !formData.price || !formData.cat) {
            toast.error("Please fill all the fields! 🥲", { position: "bottom-right" });
            return;
        }

        const newItem = new FormData();

        newItem.append("title", formData.title);
        newItem.append("desc", formData.desc);
        newItem.append("price", formData.price);
        newItem.append("cat", formData.cat);
        newItem.append("image", image);
        console.log(newItem);

        try {
            const response = await axios.post(`${URL}/api/food/add`, newItem);
            if (response.status === 201) {
                toast.success("Item added successfully! 🚀", { position: "bottom-right" });
                setFormData({
                    title: '',
                    desc: '',
                    cat: '',
                    price: '',
                });
                setImage(null);
                // navigate("/list");
            }
        } catch (error) {
            toast.error("Failed to add item! 🥲", { position: "bottom-right" });
            console.error("Error adding item:", error);
        }
    };

    const categories = [
        'Salad',
        'Rolls',
        'Desserts',
        'Sandwich',
        'Cake',
        'Paratha',
        'Noodles',
    ];

    return (
        <div>
            <div

                className="max-w-xl mx-auto p-6 rounded space-y-4"
            >
                <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>

                {/* Image Upload */}
                <div>
                    <label className="block mb-1 font-medium">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => {
                            setImage(e.target.files[0])
                            console.log(e.target.files[0])
                        }}
                        className="w-full border border-gray-300 p-2 rounded h-20"
                    />
                </div>

                {/* Title (Item Name) */}
                <div>
                    <label className="block mb-1 font-medium">Item Name</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"

                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="desc"
                        rows="3"
                        value={formData.desc}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"

                    ></textarea>
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select
                        name="cat"
                        value={formData.cat}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"

                    >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"

                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mb-16">
                    <button
                        onClick={handleSubmit} size='large' className="my-10 px-5 py-3 text-lg font-medium bg-orange-500 text-white rounded-md hover:bg-orange-600 hover:scale-105 hover:translate-x-1 duration-300 transition-all"
                        variant="contained" >
                        ADD ITEM
                    </button>

                    <ToastContainer />


                </div>
            </div>
        </div>
    )
};

export default AddItemForm;
