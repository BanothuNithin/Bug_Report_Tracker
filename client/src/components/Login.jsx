import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginImage from "../assets/login-image.png";

export default function Login({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://bug-report-tracker-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        const userRes = await fetch("https://bug-report-tracker-backend.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${data.token}` },
        });
        const userData = await userRes.json();
        setCurrentUser(userData);
        navigate("/dashboard");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side Image with Gradient Overlay */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src={LoginImage}
          alt="Login Illustration"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-extrabold drop-shadow-lg">
            Welcome Back!
          </h1>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white/30 backdrop-blur-lg border border-white/30 p-10 rounded-3xl shadow-xl w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-indigo-600 text-center">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-white/50 bg-white/30 placeholder-black-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-white/50 bg-white/30 placeholder-black-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm transition"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md cursor-pointer"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
