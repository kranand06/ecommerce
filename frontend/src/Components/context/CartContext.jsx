import { createContext, useEffect, useState } from "react"
// import { checkAuth, loginUser, logoutUser, signupUser } from "../utils/auth.js";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cart, setCart] = useState({});
    const [total, setTotal] = useState(0);

    const token = localStorage.getItem("token");

    const getCart = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/cart/get`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 200) {
                setCart(res.data.cart);
            } else {
                toast.error("Failed to fetch cart!");
            }
        } catch (error) {
            toast.error("Failed to fetch cart!");
        }
    };

    useEffect(() => {
        if (token) {
            getCart();
        }
    }, [token]);

    const addToCart = async (foodID) => {
        try {
            const res = await axios.post(`${API_URL}/api/cart/add`, { foodID }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 201) {
                const { cart: updatedCart } = res.data;
                setCart(updatedCart);
                toast.success("Item added to cart!");
            } else {
                toast.error("Failed to add item to cart!");
            }
        } catch (error) {
            toast.error("Failed to add item to cart!");
        }
    };

    const removeFromCart = async (foodID) => {
        try {
            const res = await axios.post(`${API_URL}/api/cart/remove`, { foodID }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 200) {
                const { cart: updatedCart } = res.data;
                setCart(updatedCart);
                toast.success("Item removed from cart!");
            } else {
                toast.error("Failed to remove item from cart!");
            }
        } catch (error) {
            toast.error("Failed to remove item from cart!");
        }
    };

    const clearCart = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/cart/clear`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 200) {
                setCart({});
                toast.success("Cart cleared!");
            } else {
                toast.error("Failed to clear cart!");
            }
        } catch (error) {
            toast.error("Failed to clear cart!");
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, total, setTotal, addToCart, removeFromCart, clearCart, getCart }}>
            {children}
        </CartContext.Provider>
    );
}