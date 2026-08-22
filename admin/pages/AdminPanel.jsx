import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [stats, setStats] = useState({
    hotels: 0,
    rooms: 0,
    bookings: 0,
    users: 0,
    totalRevenue: 0,
    totalProfit: 0,
    confirmedBookings: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // ==========================================
      // FETCH ALL DATA
      // ==========================================

      const [
        hotelsRes,
        roomsRes,
        bookingsRes,
        usersRes,
        bookingStatsRes,
      ] = await Promise.allSettled([
        fetch("http://localhost:5000/api/hotels", { headers }),

        fetch("http://localhost:5000/api/rooms", { headers }),

        fetch("http://localhost:5000/api/bookings/admin", { headers }),

        fetch("http://localhost:5000/api/user/admin/users", { headers }),

        // Revenue / Profit API
        fetch("http://localhost:5000/api/bookings/admin/stats", {
          headers,
        }),
      ]);

      // ==========================================
      // PARSE NORMAL RESPONSE
      // ==========================================

      const parseResponse = async (result, key) => {
        if (result.status !== "fulfilled" || !result.value.ok) {
          return [];
        }

        const data = await result.value.json();

        if (Array.isArray(data)) {
          return data;
        }

        if (Array.isArray(data[key])) {
          return data[key];
        }

        if (Array.isArray(data.data)) {
          return data.data;
        }

        return [];
      };

      const hotels = await parseResponse(hotelsRes, "hotels");

      const rooms = await parseResponse(roomsRes, "rooms");

      const bookings = await parseResponse(bookingsRes, "bookings");

      const users = await parseResponse(usersRes, "users");

      // ==========================================
      // PARSE REVENUE / PROFIT
      // ==========================================

      let totalRevenue = 0;
      let totalProfit = 0;
      let confirmedBookings = 0;

      if (
        bookingStatsRes.status === "fulfilled" &&
        bookingStatsRes.value.ok
      ) {
        const data = await bookingStatsRes.value.json();

        if (data.success) {
          totalRevenue = Number(data.totalRevenue) || 0;
          totalProfit = Number(data.totalProfit) || 0;
          confirmedBookings = Number(data.confirmedBookings) || 0;
        }
      }

      // ==========================================
      // SET ALL STATS
      // ==========================================

      setStats({
        hotels: hotels.length,
        rooms: rooms.length,
        bookings: bookings.length,
        users: users.length,

        totalRevenue,
        totalProfit,
        confirmedBookings,
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);

      setError("Failed to load live dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FORMAT INDIAN RUPEES
  // ==========================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="space-y-6">
      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back, Administrator. Here's what's happening with your hotel
          system.
        </p>
      </div>

      {/* ==========================================
          ERROR
      ========================================== */}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* ==========================================
          EXISTING STAT CARDS
      ========================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* TOTAL HOTELS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Hotels
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : stats.hotels}
              </h2>

              <p className="text-xs text-green-600 mt-2">
                Hotels in system
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
              🏨
            </div>
          </div>
        </div>

        {/* TOTAL ROOMS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Rooms
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : stats.rooms}
              </h2>

              <p className="text-xs text-green-600 mt-2">
                Rooms available
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
              🛏️
            </div>
          </div>
        </div>

        {/* TOTAL BOOKINGS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Bookings
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : stats.bookings}
              </h2>

              <p className="text-xs text-green-600 mt-2">
                Customer bookings
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
              📅
            </div>
          </div>
        </div>

        {/* TOTAL USERS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : stats.users}
              </h2>

              <p className="text-xs text-green-600 mt-2">
                Registered users
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          NEW: REVENUE / PROFIT / CONFIRMED
      ========================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* TOTAL BOOKING REVENUE */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Booking Revenue
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {loading
                  ? "..."
                  : formatCurrency(stats.totalRevenue)}
              </h2>

              <p className="text-xs text-green-600 mt-2">
                From confirmed bookings
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
              💰
            </div>
          </div>
        </div>

        {/* TOTAL PROFIT */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Profit
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {loading
                  ? "..."
                  : formatCurrency(stats.totalProfit)}
              </h2>

              <p className="text-xs text-gray-500 mt-2">
                Estimated profit
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
              📈
            </div>
          </div>
        </div>

        {/* CONFIRMED BOOKINGS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Confirmed Bookings
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {loading ? "..." : stats.confirmedBookings}
              </h2>

              <p className="text-xs text-blue-600 mt-2">
                Revenue generating bookings
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          QUICK ACTIONS & SYSTEM STATUS
      ========================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QUICK ACTIONS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() =>
                (window.location.href = "/admin/hotels")
              }
              className="p-5 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition text-left"
            >
              <div className="text-2xl mb-2">🏨</div>

              <h3 className="font-semibold text-gray-900">
                Manage Hotels
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Add or edit hotels
              </p>
            </button>

            <button
              onClick={() =>
                (window.location.href = "/admin/rooms")
              }
              className="p-5 rounded-xl border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition text-left"
            >
              <div className="text-2xl mb-2">🛏️</div>

              <h3 className="font-semibold text-gray-900">
                Manage Rooms
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Manage hotel rooms
              </p>
            </button>

            <button
              onClick={() =>
                (window.location.href = "/admin/bookings")
              }
              className="p-5 rounded-xl border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition text-left"
            >
              <div className="text-2xl mb-2">📅</div>

              <h3 className="font-semibold text-gray-900">
                View Bookings
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Check customer bookings
              </p>
            </button>

            <button
              onClick={() =>
                (window.location.href = "/admin/users")
              }
              className="p-5 rounded-xl border border-gray-200 hover:border-green-400 hover:bg-green-50 transition text-left"
            >
              <div className="text-2xl mb-2">👥</div>

              <h3 className="font-semibold text-gray-900">
                Manage Users
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                View registered users
              </p>
            </button>
          </div>
        </div>

        {/* SYSTEM STATUS */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            System Status
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />

                <span className="text-sm font-medium">
                  Backend Server
                </span>
              </div>

              <span className="text-sm text-green-600 font-medium">
                Online
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />

                <span className="text-sm font-medium">
                  Database
                </span>
              </div>

              <span className="text-sm text-green-600 font-medium">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500" />

                <span className="text-sm font-medium">
                  Admin Authentication
                </span>
              </div>

              <span className="text-sm text-green-600 font-medium">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;