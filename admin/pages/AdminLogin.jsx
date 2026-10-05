import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    // Temporary admin credentials
    const ADMIN_ID = "admin";
    const ADMIN_PASSWORD = "admin123";

    if (adminId === ADMIN_ID && password === ADMIN_PASSWORD) {
      // Save admin login
      localStorage.setItem("adminToken", "true");

      // Go to Admin Dashboard
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Invalid Admin ID or Password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">

          {/* Logo
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              🏨
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Hotel<span className="text-blue-600">Hub</span>
            </h1>

            <p className="text-gray-500 mt-1">
              Admin Administration Panel
            </p>
          </div> */}

        {/* Login Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Admin Login
          </h2>

          <p className="text-gray-500 text-sm text-center mt-2 mb-6">
            Login to manage your HotelHub system
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-5 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* Admin ID */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Admin ID
              </label>

              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter Admin ID"
                autoComplete="username"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                autoComplete="current-password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
            >
              {loading ? "Logging in..." : "Login as Admin"}
            </button>

          </form>


        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
