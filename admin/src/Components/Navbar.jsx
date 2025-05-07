
import Button from '@mui/material/Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import Signin from "./Signin";
import { UserContext } from '../App';
import React, { useContext, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { googleLogout } from '@react-oauth/google';
import { IoSearchSharp } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";




function Navbar() {

    // const [menu, setMenu] = useState("home");


    const navigation = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const value = useContext(UserContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem("user");
        setAnchorEl(null);
        navigation("/");
    };



    return (
        <>
            {/* <header className='shadow fixed mt-2 h-16'> */}
            <header className="fixed top-0 left-0 w-full shadow pt-2 h-20 bg-white">
                <div className='flex justify-between items-center px-4 py-1 max-w-screen-xl mx-auto'>
                    <Link to="/">
                        <img className='w-80' src="/Logo.svg" alt="logo" />
                    </Link>

                    <div className="hidden  w-full lg:flex lg:w-auto text-lg"
                    >
                        <ul className="flex space-x-10">
                            <li>
                                <NavLink to="/" className={({ isActive }) => ` ${(isActive == true) ? "text-orange-400" : "text-gray-700"} hover:text-orange-400 hover:scale-110 duration-300 `}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/orders" className={({ isActive }) => ` ${(isActive == true) ? "text-orange-400" : "text-gray-700"} hover:text-orange-400 hover:scale-110 duration-300 `}>
                                    Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/list" className={({ isActive }) => ` ${(isActive == true) ? 'text-orange-400' : 'text-gray-700'} hover:text-orange-400 hover:scale-110  duration-300 `} >
                                    List Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/add" className={({ isActive }) => ` ${(isActive == true) ? 'text-orange-400' : 'text-gray-700'} hover:text-orange-400 hover:scale-110  duration-300 `} >
                                    Add Items
                                </NavLink>
                            </li>




                        </ul>
                    </div>
                    <Signin />
                    {/* <div className='flex space-x-6 items-center mt-2 sm:hidden mx-3'>
                        <IoSearchSharp className=' w-8 h-8 hover:text-orange-400 hover:translate-x-1 duration-300  cursor-pointer'></IoSearchSharp>
                    <NavLink to="/cart" className={({ isActive }) => ` ${(isActive == true) ? 'text-orange-400' : 'text-gray-700'} hover:text-orange-400 hover:scale-110 hover:translate-x-1 duration-300 cursor-pointer`} >
                        <LuShoppingCart className='w-8 h-8 hover:text-orange-400 hover:translate-x-1 duration-300  cursor-pointer'></LuShoppingCart>
                    </NavLink>
                    </div> */}

                    <div className='sm:flex space-x-10 items-center'>
                        {/* <IoSearchSharp className='w-8 h-8 hover:text-orange-400 hover:scale-110 hover:translate-x-1 duration-300  cursor-pointer'></IoSearchSharp>
                        <NavLink to="/cart" className={({ isActive }) => ` ${(isActive == true) ? 'text-orange-400' : 'text-gray-700'} hover:text-orange-400 hover:scale-110 hover:translate-x-1 duration-300 cursor-pointer`} >
                            <LuShoppingCart className='w-8 h-8 hover:text-orange-400 hover:scale-110 hover:translate-x-1 duration-300 cursor-pointer'></LuShoppingCart>
                        </NavLink> */}



                        {user ? <div onClick={handleClick}>
                            <img src={user.picture} alt="user" className="w-10 h-10 rounded-full hover:scale-110 hover:translate-x-1 duration-300 cursor-pointer" />
                        </div> : <Button onClick={() => value.setOpen(true)} size='large' className='bg-black hover:text-orange-400 hover:scale-110 hover:translate-x-1 duration-600 cursor-pointer' variant="contained">Sign UP</Button>}

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}><Link to="/myorders" >My Orders</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to="/myprofile" >Profile</Link></MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>

                    </div>
                </div>
            </header>

        </>
    )
}

export default Navbar