import React, { useState } from "react";
import BugForm from "./BugForm";
import BugList from "./BugList";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ setCurrentUser, currentUser }) {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false); // trigger BugList refresh

  // Refresh BugList after new bug is created
  const handleBugCreated = () => setRefresh((prev) => !prev);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/20 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            BugTracker
          </h1>
          <div className="flex items-center space-x-4">
            {currentUser && (
              <span className="text-gray-700 font-medium">
                Logged in as:{" "}
                <span className="text-indigo-600">
                  {currentUser.name || currentUser.email}
                </span>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col p-6 flex-1 space-y-8">
        {/* Header */}
        <header className="flex flex-col items-center justify-center text-center mb-8">
          <h2 className="text-4xl font-bold text-black-600 mb-2">
            🐞 Bug Tracker Dashboard
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Report, track, and manage bugs efficiently. Role-based view for{" "}
            <span className="font-semibold text-indigo-500">Admins</span> and{" "}
            <span className="font-semibold text-indigo-500">Reporters</span>.
          </p>
        </header>

        {/* Bug Form */}
        <section className="w-full max-w-2xl mx-auto bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-6">
          <BugForm onCreated={handleBugCreated} />
        </section>

        {/* Bug List */}
        <section className="w-full max-w-5xl mx-auto">
          <BugList refresh={refresh} />
        </section>
      </div>
    </div>
  );
}
