// src/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token exists, redirect to home
  if (token) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access
  return children;
};

export default PublicRoute;
