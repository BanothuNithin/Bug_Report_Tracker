import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import RegisterImage from "../assets/register-image.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reporter");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password, role });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Server not responding");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src={RegisterImage}
          alt="Register Illustration"
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-extrabold drop-shadow-lg">
            Join Us!
          </h1>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white/30 backdrop-blur-lg border border-white/30 p-10 rounded-3xl shadow-xl w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-indigo-600 text-center">
            Register
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-white/50 bg-white/30 placeholder-black-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm transition"
              required
            />
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
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 rounded-xl border border-white/50 bg-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm transition"
            >
              <option value="reporter">Reporter</option>
              <option value="developer">Developer</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white bg-green-500 hover:bg-green-600 transition-colors shadow-md cursor-pointer"
            >
              Register
            </button>
          </form>
          <p className="text-center text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
