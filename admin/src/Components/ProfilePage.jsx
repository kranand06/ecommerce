import React from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

function ProfilePage() {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {name: 'Guest', email: 'example@anandrestro.com', picture: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fblank-profile-picture&psig=AOvVaw3laxN64YajMq0U1KVzKUWN&ust=1737053945715000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMiz16-0-IoDFQAAAAAdAAAAABAE'};
    const navigation = useNavigate();
    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem("user");
        navigation("/");
    };

    return (
        <div className="min-h-screen flex items-start justify-center  pt-16">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
            <div className="text-center mb-8">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-6"
                src={user.picture}
                alt="User Profile"
              />
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
    
            {/* Buttons Section */}
            <div className="flex justify-between">
              <button  className="bg-transparent border border-gray-300 text-gray-600 py-2 px-4 rounded hover:translate-x-1 cursor-pointer transition-all duration-300">
                <Link to= "/myorders">My Orders</Link>
              </button>
              <button onClick={handleLogout} className="bg-black text-white py-2 px-4 rounded  hover:bg-orange-600 cursor-pointer transition-all duration-300">
                Logout
              </button>
            </div>
          </div>
        </div>
      );
}

export default ProfilePage;