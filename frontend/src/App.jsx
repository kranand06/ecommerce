import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import './index.css'
import Footer from "./Components/Footer"
import { createContext, useState } from 'react'
import Category from "./Category.js"
import { ToastContainer } from "react-toastify"
import UserProvider from "./Components/context/UserContext.jsx"
import CartProvider from "./Components/context/CartContext.jsx"


export const MenuContext = createContext();
export const AmountContext = createContext();

function App() {
  const [food, setFood] = useState({});
  const [amount, setAmount] = useState(0);

  



  return (
    <>
      <CartProvider>
        <UserProvider>
          <MenuContext.Provider value={{ food, setFood, Category }}>
            <AmountContext.Provider value={{ amount, setAmount }}>
              <Navbar />
              <Outlet />
              <Footer />
              <ToastContainer />
            </AmountContext.Provider>
          </MenuContext.Provider>
        </UserProvider>
      </CartProvider>
    </>
  )
}

export default App




