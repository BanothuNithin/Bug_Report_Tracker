import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  // If user is not logged in, redirect to HomePage
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user exists, render the protected component
  return children;
}
