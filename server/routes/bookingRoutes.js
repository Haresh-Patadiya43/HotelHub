const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  cancelBooking,

  // Admin
  getAllBookings,
  getBookingStats,
  confirmBooking,
  adminCancelBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

// ======================
// USER ROUTES
// ======================

// Create booking
router.post("/", protect, createBooking);

// Get logged-in user's bookings
router.get("/my-bookings", protect, getMyBookings);

// Cancel own booking
router.patch("/:id/cancel", protect, cancelBooking);

// ======================
// ADMIN ROUTES
// ======================

// Get all bookings
router.get("/admin", getAllBookings);

// Get booking revenue / profit statistics
router.get("/admin/stats", getBookingStats);

// Confirm booking
router.patch("/:id/confirm", confirmBooking);

// Cancel booking
router.patch("/:id/admin-cancel", adminCancelBooking);

// Delete booking
router.delete("/:id", deleteBooking);

module.exports = router;