import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import './index.css'
import Footer from "./Components/Footer"
import { createContext, useState } from 'react'


export const UserContext = createContext();
export const CartContext = createContext();

function App() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({});

  return (
    <>
      <UserContext.Provider value={{ open, setOpen }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navbar />
          <Outlet />
          <Footer />
        </CartContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App




