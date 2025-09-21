import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtecteRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://bug-report-tracker-backend.onrender.com/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((user) => {
        setCurrentUser(user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setCurrentUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setCurrentUser={setCurrentUser} />
            )
          }
        />
        <Route
          path="/register"
          element={
            currentUser ? <Navigate to="/dashboard" replace /> : <Register />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={currentUser}>
              <Dashboard
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
