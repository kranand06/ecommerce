import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import './index.css'
import Footer from "./Components/Footer"
import { createContext, useState } from 'react'
import Sidebar from "./Components/Sidebar"



export const UserContext = createContext();

function App() {
  const [open, setOpen] = useState(false);


  return (
    <>
      <UserContext.Provider value={{ open, setOpen }}>
            <Navbar />
            <div className="mt-20 flex flex-row gap-5 ">
            <Sidebar />
            <Outlet />
            </div>
            <Footer />
      </UserContext.Provider>
    </>
  )
}

export default App