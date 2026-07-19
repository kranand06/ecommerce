import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
    // Or navigate to "/signin" if you have a separate sign-in page
  }

  return children;
};

export default ProtectedRoute;