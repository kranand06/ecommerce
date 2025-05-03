import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Error404 from './Components/Error404.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './Components/Home/home.jsx'
import ProfilePage from './Components/ProfilePage.jsx'
import AddItems from './Components/Add Items/AddItems.jsx'
import ListItems from './Components/List Items/ListItems.jsx'
import Orders from './Components/Orders/Orders.jsx'

const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element:<Home />,
      },
      {
        path: '/add',
        element:<AddItems />,
      },
      {
        path: '/list',
        element:<ListItems />,
      },
      {
        path: '/orders',
        element:<Orders />,
      },
      {
        path: 'myprofile',
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={route} />
    </GoogleOAuthProvider>

)
