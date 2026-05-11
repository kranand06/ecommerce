import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import './index.css'
import Footer from "./Components/Footer"
import { createContext, useState } from 'react'
import Category from "./Category.js"
import { ToastContainer } from "react-toastify"
import UserProvider from "./Components/context/UserContext.jsx"


export const CartContext = createContext();
export const MenuContext = createContext();
export const AmountContext = createContext();

function App() {
  const [cart, setCart] = useState({});
  const [food, setFood] = useState({});
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);

  

  return (
    <>
      <UserProvider>
        <MenuContext.Provider value={{ food, setFood ,Category }}>
        <AmountContext.Provider value={{ amount, setAmount }}>
          <CartContext.Provider value={{  cart, setCart, total, setTotal }}>
            <Navbar />
            <Outlet />
            <Footer />
            <ToastContainer/>
          </CartContext.Provider>
        </AmountContext.Provider>
        </MenuContext.Provider>
      </UserProvider>
    </>
  )
}

export default App




