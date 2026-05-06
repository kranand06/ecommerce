import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { TextField, Button, Dialog, DialogContent } from "@mui/material";

export default function AuthModal() {
  const { open, setOpen } = useContext(UserContext);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, password } = formData;

    if (!email.includes("@")) {
      toast.error("Invalid email");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (!isLogin && name.trim() === "") {
      toast.error("Name is required");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;
    localStorage.setItem("user", JSON.stringify(formData));
    toast.success(isLogin ? "Login successful" : "Signup successful");
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-[90vw] max-w-md"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <img src="/Logo.jpg" alt="logo" className="w-40 m-4 mb-0" />
              <div
                className="p-4 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <RxCross2 className="w-6 h-6" />
              </div>
            </div>

            <DialogContent>
              <h2 className="text-2xl font-bold mb-2">
                {isLogin ? "Login" : "Create Account"}
              </h2>

              <p className="text-lg">
                {isLogin
                  ? "Welcome back!"
                  : "Sign up to get started"}
              </p>
              <h3 className="text-lg mb-4 font-normal">Seamlessly Sign-in to the app directly</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    onChange={handleChange}
                  />
                )}

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  onChange={handleChange}
                />

                <div className="relative flex items-center">
                  <TextField
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <Button  type="submit" variant="contained" fullWidth size='large' className='bg-black m-4'>
                  {isLogin ? "Login" : "Sign Up"}
                  
                </Button>
              </form>

              {/* Toggle */}
              <p className="text-center mt-4 text-sm">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <span
                  className="text-orange-400 cursor-pointer ml-1"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </span>
              </p>
            </DialogContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
