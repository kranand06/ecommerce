import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import './index.css'
import Footer from "./Components/Footer"
import { createContext, useState } from 'react'
import { Category } from "./menu.js"


export const UserContext = createContext();
export const CartContext = createContext();
export const MenuContext = createContext();
export const AmountContext = createContext();

function App() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [food, setFood] = useState({});
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);

  

  return (
    <>
      <UserContext.Provider value={{ open, setOpen }}>
        <MenuContext.Provider value={{ food, setFood ,Category }}>
        <AmountContext.Provider value={{ amount, setAmount }}>
          <CartContext.Provider value={{  cart, setCart, total, setTotal }}>
            <Navbar />
            <Outlet />
            <Footer />
          </CartContext.Provider>
        </AmountContext.Provider>
        </MenuContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App




