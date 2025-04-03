import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Error404 from './Components/Error404.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './Components/Home/home.jsx'
import ProfilePage from './Components/ProfilePage.jsx'
import CartPage from './Components/Cart/CartPage.jsx'
import OrderPage from './Components/Order/OrderPage.jsx'
import MenuPage from './Components/Menu/MenuPage.jsx'




const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element:<Home />,
      },
      {
        path: '/menu',
        element:<MenuPage />,
      },
      {
        path: '/cart',
        element:<CartPage />,
      },
      {
        path: '/order',
        element:<OrderPage />,
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
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={route} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
