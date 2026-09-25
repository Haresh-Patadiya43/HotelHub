import { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// =====================================================
// USER COMPONENTS
// =====================================================
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import ScrollToTop from "./componets/ScrollToTop";

// =====================================================
// USER PAGES
// =====================================================
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import UserProfile from "./pages/UserProfile";
import Experiences from "./pages/Experiences";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Offers from "./pages/Offers";
import LoginModal from "./pages/LoginModal";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./componets/MyBookings";
import Payment from "./pages/Payment";

// =====================================================
// ADMIN PAGES
// =====================================================
import AdminLogin from "../admin/pages/AdminLogin";
import AdminPanel from "../admin/pages/AdminPanel";
import AdminHotels from "../admin/pages/AdminHotels";
import AdminRooms from "../admin/pages/AdminRooms";
import AdminBookings from "../admin/pages/AdminBookings";
import AdminUsers from "../admin/pages/AdminUsers";

// =====================================================
// ADMIN COMPONENTS
// =====================================================
import AdminProtectedRoute from "../admin/pages/components/AdminProtectedRoute";
import AdminLayout from "../admin/pages/AdminLayout";

// =====================================================
// CSS
// =====================================================
import "./App.css";

// =====================================================
// MAIN USER LAYOUT
// IMPORTANT:
// Keep this OUTSIDE App().
// This fixes:
// "Cannot create components during render"
// =====================================================
const MainLayout = ({ isLoggedIn, onLoginClick, onLogout }) => {
  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
      />

      <Outlet />

      <Footer />
    </>
  );
};

// =====================================================
// APP
// =====================================================
function App() {
  // ===================================================
  // USER LOGIN STATE
  // ===================================================
  const [showLogin, setShowLogin] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // ===================================================
  // USER LOGOUT
  // ===================================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    toast.custom((t) => (
      <div
        className={`
          ${t.visible ? "animate-fadeIn" : ""}
          w-[350px]
          bg-white
          shadow-2xl
          rounded-2xl
          border
          border-gray-100
          overflow-hidden
        `}
      >
        {/* Top Gradient */}
        <div className="h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400" />

        <div className="p-5 flex items-center gap-4">
          {/* Logout Icon */}
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-lg font-bold text-gray-800">Logged Out 👋</h3>

            <p className="text-sm text-gray-500">
              You have been logged out successfully
            </p>

            <p className="text-xs text-red-500 mt-1 font-medium">
              See you again soon!
            </p>
          </div>
        </div>
      </div>
    ));
  };

  // ===================================================
  // APP
  // ===================================================
  return (
    <>
      {/* =================================================
          TOASTER
      ================================================= */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,

          style: {
            borderRadius: "12px",
            background: "#ffffff",
            color: "#111827",
            padding: "14px 18px",
            fontSize: "15px",
          },

          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },

          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* =================================================
          SCROLL TO TOP
      ================================================= */}
      <ScrollToTop />

      {/* =================================================
          ALL ROUTES
      ================================================= */}
      <Routes>
        {/* =================================================
            USER WEBSITE
        ================================================= */}
        <Route
          element={
            <MainLayout
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setShowLogin(true)}
              onLogout={handleLogout}
            />
          }
        >
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* HOTELS */}
          <Route path="/Hotels" element={<Hotels />} />

          {/* HOTEL DETAILS */}
          <Route path="/hotel/:id" element={<HotelDetails />} />

          {/* USER PROFILE */}
          <Route path="/profile" element={<UserProfile />} />

          {/* EXPERIENCES */}
          <Route path="/experiences" element={<Experiences />} />

          {/* ABOUT US */}
          <Route path="/aboutus" element={<AboutUs />} />

          {/* OFFERS */}
          <Route path="/offers" element={<Offers />} />

          {/* CONTACT US */}
          <Route path="/contactus" element={<ContactUs />} />

          {/* BOOKING */}
          <Route path="/booking" element={<Booking />} />

          {/* PAYMENT */}
          <Route path="/payment" element={<Payment />} />

          {/* MY BOOKINGS */}
          <Route
            path="/my-bookings"
            element={isLoggedIn ? <MyBookings /> : <Navigate to="/" replace />}
          />

          {/* BOOKING CONFIRMATION */}
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />
        </Route>

        {/* =================================================
            ADMIN LOGIN
            /admin
        ================================================= */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* =================================================
            PROTECTED ADMIN AREA

            This is a pathless protected layout.
        ================================================= */}
        <Route
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          {/* ADMIN DASHBOARD */}
          <Route path="/admin/dashboard" element={<AdminPanel />} />

          {/* ADMIN HOTELS */}
          <Route path="/admin/hotels" element={<AdminHotels />} />

          {/* ADD HOTEL */}
          <Route path="/admin/hotels/add" element={<AdminHotels />} />

          {/* ADMIN ROOMS */}
          <Route path="/admin/rooms" element={<AdminRooms />} />

          {/* ADMIN BOOKINGS */}
          <Route path="/admin/bookings" element={<AdminBookings />} />

          {/* ADMIN USERS */}
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>

        {/* =================================================
            OLD ADMIN PANEL URL
            /admin/panel → /admin/dashboard
        ================================================= */}
        <Route
          path="/admin/panel"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* =================================================
            UNKNOWN ROUTE
        ================================================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* =================================================
          USER LOGIN MODAL
      ================================================= */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setShowLogin(false);
        }}
      />
    </>
  );
}

export default App;
