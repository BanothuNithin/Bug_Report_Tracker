import React, { useState } from "react";
import API from "../services/api";

export default function BugForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("low");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to report a bug.");

      const res = await API.post(
        "/bugs",
        { title, description, severity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setDescription("");
      setSeverity("low");
      onCreated(res.data);
      alert("Bug reported successfully!");
    } catch (error) {
      console.error("Bug submission error:", error);
      alert(error.response?.data?.message || "Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-5 bg-gray-100/30 backdrop-blur-lg rounded-3xl shadow-lg border border-blue-200/40 transition hover:shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-blue-700 text-center">
        🐞 Report a Bug
      </h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Bug Title"
        required
        className="w-full px-4 py-3 rounded-xl border border-blue-300/50 bg-blue-50/30 placeholder-black-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 backdrop-blur-sm transition-all"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Bug Description"
        required
        className="w-full px-4 py-3 rounded-xl border border-blue-300/50 bg-blue-50/30 placeholder-black-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 backdrop-blur-sm transition-all"
        rows={4}
      />

      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-blue-300/50 bg-blue-50/30 placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 backdrop-blur-sm transition-all"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 cursor-pointer ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 hover:shadow-xl"
        }`}
      >
        {loading ? "Reporting..." : "Report Bug"}
      </button>
    </form>
  );
}
