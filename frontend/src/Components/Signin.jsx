import React, { useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios"; //axios for data fetching
import { FcGoogle } from "react-icons/fc"; //google icon
import { RxCross2 } from "react-icons/rx"; //cross icon

//you have to install react-oauth , react-icon, material-ui, axios

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { UserContext } from '../App';

function Signin() {
    const value = useContext(UserContext);
    const login = useGoogleLogin({
        onSuccess: tokenResponse => getUserInfo(tokenResponse.access_token),
        onError: error => console.log(error),
    });

    const getUserInfo = (token) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${token}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: `Application/json`
            }
        }).then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            value.setOpen(false);
        })

    }


    return (

        <Dialog open={value.open} onClose={() => value.setOpen(false)} >
            <div className='flex justify-between items-center'>
            <img src="/logoNavbar.png" alt="logo" className="w-48 m-5 mb-0" />
            <div className=' p-5' onClick={() => value.setOpen(false)} ><RxCross2 className='w-6 h-6'></RxCross2></div>
            </div>
            <DialogContent>
                
                    <h2 className="text-2xl font-bold">Sign-in with Google</h2>
                   
                    
               
                <h3 className="text-lg font-normal">Seamlessly Sign-in to the app with your Google account directly</h3>


            </DialogContent>
            <Button onClick={() => login()} size='large' className='bg-black m-4' variant="contained" >< FcGoogle className="w-12 h-6" ></FcGoogle>
                Sign in </Button>
        </Dialog>

    )
}

export default Signin