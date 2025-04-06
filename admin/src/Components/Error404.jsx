import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-5 ">
      
      {/* Image */}
      <motion.img
        src="404 pizza.jpg"
        alt="Lost Pizza"
        className="w-40 md:w-52 lg:w-64 mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* 404 Text */}
      <motion.h1
        className="text-9xl font-extrabold text-gray-800 md:text-7xl sm:text-6xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        404
      </motion.h1>

      {/* Error Message */}
      <motion.p
        className="text-2xl text-gray-600 mt-4 md:text-xl sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Oops! Looks like this page is as lost as a missing pizza slice! 🍕
      </motion.p>

      {/* Go Home Button */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.9 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="px-6 py-3 bg-orange-500 text-white text-lg rounded-md transition-all duration-300 hover:bg-black"
        >
          Take Me Home 🍔
        </Link>
      </motion.div>
    </div>
  );
};

export default Error404;