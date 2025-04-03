import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-5">
      
      <motion.div
        className="bg-white p-6 rounded-full shadow-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <FiShoppingCart className="text-gray-500 text-7xl" />
      </motion.div>

      <motion.h2
        className="text-3xl font-semibold text-gray-800 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Your Cart is Empty 🛒
      </motion.h2>

      <motion.p
        className="text-gray-600 text-lg mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Looks like you haven't added anything yet!
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-6"
      >
        <Link
          to="/menu"
          className="px-6 py-3 bg-orange-500 text-white text-lg rounded-md transition-all duration-300 hover:bg-black"
        >
          Go to Menu 🍽️
        </Link>
      </motion.div>
    </div>
  );
};

export default EmptyCart;