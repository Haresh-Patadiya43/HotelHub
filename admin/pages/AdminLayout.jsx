import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import logo from "./assets/logo.png";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // LOGOUT (HARD RESET)
  // =====================================================
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    window.location.href = "/admin/login";
  };

  // =====================================================
  // ACTIVE MENU HELPERS
  // =====================================================
  const isActive = (path) => location.pathname === path;

  const menuClass = (path) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer text-left ${
      isActive(path)
        ? "bg-blue-600 text-white font-medium"
        : "text-gray-300 hover:bg-gray-800"
    }`;

  // =====================================================
  // PAGE METADATA
  // =====================================================
  const pageInfo = {
    "/admin/dashboard": {
      title: "HotelHub Admin",
      subtitle: "Manage your hotel booking system",
    },
    "/admin/hotels": {
      title: "Hotels",
      subtitle: "Manage your hotels",
    },
    "/admin/hotels/add": {
      title: "Add Hotel",
      subtitle: "Add a new hotel to your system",
    },
    "/admin/rooms": {
      title: "Rooms",
      subtitle: "Manage hotel rooms",
    },
    "/admin/bookings": {
      title: "Bookings",
      subtitle: "Manage customer bookings",
    },
    "/admin/users": {
      title: "Users",
      subtitle: "Manage registered users",
    },
  };

  const currentPage = pageInfo[location.pathname] || {
    title: "HotelHub Admin",
    subtitle: "Manage your hotel booking system",
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f7fb] text-gray-800">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 bottom-0 w-[300px] bg-[#111827] text-white hidden lg:flex flex-col z-50 overflow-hidden">
        {/* LOGO */}

        <div className="h-[90px] px-7 flex items-center border-b border-gray-700 flex-shrink-0">
          {/* Bigger & Centered Logo Box */}
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center p-1.5 mr-4 flex-shrink-0">
            <img
              src={logo}
              alt="HotelHub Logo"
              className="w-full h-full object-contain filter brightness-0 invert"
            />
          </div>

          {/* Title & Subtitle */}
          <div>
            <h1 className="text-2xl font-bold">
              Hotel<span className="text-blue-400">Hub</span>
            </h1>
            <p className="text-xs text-gray-400">ADMIN PANEL</p>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="px-5 py-8 flex-1 overflow-hidden">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold px-3 mb-4">
            Main Menu
          </p>

          <nav className="space-y-2">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className={menuClass("/admin/dashboard")}
            >
              <span className="text-lg">📊</span>
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/hotels")}
              className={menuClass("/admin/hotels")}
            >
              <span className="text-lg">🏨</span>
              <span>Hotels</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/rooms")}
              className={menuClass("/admin/rooms")}
            >
              <span className="text-lg">🛏️</span>
              <span>Rooms</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/bookings")}
              className={menuClass("/admin/bookings")}
            >
              <span className="text-lg">📅</span>
              <span>Bookings</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className={menuClass("/admin/users")}
            >
              <span className="text-lg">👥</span>
              <span>Users</span>
            </button>
          </nav>

          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold px-3 mt-10 mb-4">
            System
          </p>

          <button
            type="button"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 transition"
          >
            <span className="text-lg">⚙️</span>
            <span>Settings</span>
          </button>
        </div>

        {/* ADMIN PROFILE */}
        <div className="border-t border-gray-700 p-5 flex-shrink-0 bg-[#111827]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
              A
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">Administrator</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-3 rounded-lg bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white transition text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="lg:ml-[300px] min-h-screen">
        <header className="h-[90px] bg-white border-b border-gray-200 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {currentPage.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              {currentPage.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative w-12 h-12 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-xl"
            >
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </button>

            <div className="h-10 w-px bg-gray-200" />

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-5 sm:p-8">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
