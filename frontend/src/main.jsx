import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Error404 from "./Components/Error404.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./Components/Home/home.jsx";
import ProfilePage from "./Components/ProfilePage.jsx";
import CartPage from "./Components/Cart/CartPage.jsx";
import OrderPage from "./Components/Order/OrderPage.jsx";
import MenuPage from "./Components/Menu/MenuPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import OrderPlaced from "./Components/Order/OrderPlaced.jsx";
import MyOrders from "./Components/MyOrder/MyOrders.jsx";
import OrderDetails from "./Components/MyOrder/OrderDetails.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "placed",
        element: (
          <ProtectedRoute>
            <OrderPlaced />
          </ProtectedRoute>
        ),
      },
      {
        path: "myorders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "myorders/:id",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "myprofile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <RouterProvider router={route} />
  </GoogleOAuthProvider>,
);
