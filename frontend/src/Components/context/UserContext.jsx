import { createContext, useContext, useEffect, useState } from "react"
import { checkAuth, loginUser, logoutUser, signupUser } from "../utils/auth.js";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext.jsx";

export const UserContext = createContext({});

export default function UserProvider({ children }) {

  const {cart, setCart} = useContext(CartContext);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [open, setOpen] = useState(false);


  const fetchAuth = async () => {
    const res = await checkAuth();
    if (res) {
      setUser(res.user);
      setToken(res.token);
    } else {
      setUser(null);
      setToken(null);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);

    if (res.success) {
      const { token, user } = res.data;

      localStorage.setItem("token", token);

      setUser(user);
      setToken(token);
      return res;
    }
    else {
      setUser(null);
      setToken(null);
      return res;
    }
  };

  const signup = async (name, email, password) => {
    const res = await signupUser(name, email, password);

    if (res.success) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      return res;
    }
    else {
      setUser(null);
      setToken(null);
      return res;
    }
  };

  const logout = async () => {
    const res = await logoutUser();
    if(res.success) {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setCart({});
    toast.success("Logged out successfully!");
    } else {
      toast.error("Logout failed. Try again.");
    }
  }


  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, login, signup, logout, open, setOpen }}>
      {children}
    </UserContext.Provider>
  );
}