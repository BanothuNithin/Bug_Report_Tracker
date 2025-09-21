import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function BugList() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // filters
  const [statusFilter, setStatusFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  // fetch bugs
  const fetchBugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get(
        `/bugs?status=${statusFilter}&severity=${severityFilter}&search=${searchText}`
      );
      setBugs(res.data);
    } catch (err) {
      console.error("Error fetching bugs:", err);
      setError("Failed to load bugs.");
    } finally {
      setLoading(false);
    }
  };

  // update status
  const updateBugStatus = async (bugId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`https://bug-report-tracker-backend.onrender.com/api/bugs/${bugId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setBugs((prev) =>
          prev.map((bug) =>
            bug._id === bugId ? { ...bug, status: newStatus } : bug
          )
        );
      }
    } catch (error) {
      console.error("Error updating bug:", error);
      setError("Failed to update bug status.");
    }
  };

  useEffect(() => {
    fetchBugs();
  }, [statusFilter, severityFilter, searchText]);

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-6">
      <h2 className="text-3xl font-bold text-black-700 mb-4 text-center">
        🐞 Bug List
      </h2>

      {/* Filters + Search */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-blue-300/50 bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm transition cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-blue-300/50 bg-blue-50/30 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm transition cursor-pointer"
        >
          <option value="">All Severity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          placeholder="Search by title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 rounded-lg border border-blue-300/50 bg-blue-50/30 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm flex-1 transition"
        />
      </div>

      {/* Loading/Error states */}
      {loading && <p className="text-center text-blue-600">Loading bugs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Bug List */}
      {!loading &&
        bugs.map((bug) => (
          <div
            key={bug._id}
            className="p-5 bg-blue-100/30 backdrop-blur-lg rounded-2xl shadow-lg border border-blue-200/40 space-y-3 transition hover:shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-black-800">
              {bug.title}{" "}
              <span className="text-sm font-normal text-black-600">
                ({bug.severity})
              </span>
            </h3>
            <p className="text-black-700">
              <b>Description: </b>
              {bug.description}
            </p>
            <p className="text-black-600">
              <b>Status: </b>
              {bug.status}
            </p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => updateBugStatus(bug._id, "in-progress")}
                className="px-4 py-2 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 transition cursor-pointer"
              >
                In Progress
              </button>
              <button
                onClick={() => updateBugStatus(bug._id, "closed")}
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ))}

      {!loading && bugs.length === 0 && !error && (
        <p className="text-center text-blue-600">No bugs found.</p>
      )}
    </div>
  );
}
