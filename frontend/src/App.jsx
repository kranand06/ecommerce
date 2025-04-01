import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import './index.css'
// import Footer from "./Components/Footer"
import { createContext, useState } from 'react'


export const UserContext = createContext();

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <UserContext.Provider value={{ open, setOpen }}>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
      </UserContext.Provider>
    </>
  )
}

export default App