import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div>
          <h2 className="text-3xl font-bold font-inter">Anand Restro</h2>
          <p className="mt-2 text-gray-400">Serving delicious food with love.</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/orders" className="hover:text-white">Orders</Link></li>
            <li><Link to="/list" className="hover:text-white">List Items</Link></li>
            <li><Link to="/add" className="hover:text-white">Add Items</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p className="text-gray-400">123 Main Street, Ranchi, India</p>
          <p className="text-gray-400">📞 +91 75205 37469</p>
          <p className="text-gray-400">✉️ contact@anandrestro.com</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-center px-5">

        {/* <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white text-xl"><FaFacebookF /></a>
          <a href="#" className="text-gray-400 hover:text-white text-xl"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
        </div> */}
        
        <p className="text-gray-500 mt-4 md:mt-0 text-center">© {new Date().getFullYear()} Anand Restro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;