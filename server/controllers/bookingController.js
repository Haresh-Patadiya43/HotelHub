const Booking = require("../models/Booking");
const mongoose = require("mongoose");

// ============================
// CREATE BOOKING
// ============================

const createBooking = async (req, res) => {
  try {
    const {
      hotelId,
      hotelName,
      hotelLocation,
      hotelImage,
      roomName,
      roomImage,
      roomPrice,
      checkIn,
      checkOut,
      guests,
      nights,
      guestName,
      phone,
      email,
      taxes,
      totalPrice,
    } = req.body;

    // ============================
    // CHECK LOGIN
    // ============================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Please login to make a booking.",
      });
    }

    // ============================
    // REQUIRED FIELDS
    // ============================

    if (
      !hotelId ||
      !hotelName ||
      !hotelLocation ||
      !hotelImage ||
      !roomName ||
      !roomImage ||
      roomPrice === undefined ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !nights ||
      !guestName ||
      !phone ||
      !email ||
      taxes === undefined ||
      totalPrice === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required booking details.",
      });
    }

    // ============================
    // CHECK HOTEL ID
    // ============================

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid hotel ID.",
      });
    }

    // ============================
    // CHECK DATES
    // ============================

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking dates.",
      });
    }

    if (endDate <= startDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out must be after check-in.",
      });
    }

    // ============================
    // CREATE BOOKING
    // ============================

    const booking = await Booking.create({
      userId: req.user.id,

      hotelId,
      hotelName,
      hotelLocation,
      hotelImage,

      roomName,
      roomImage,
      roomPrice,

      checkIn: startDate,
      checkOut: endDate,

      guests,
      nights,

      guestName,
      phone,
      email,

      taxes,
      totalPrice,

      bookingStatus: "confirmed",
    });

    // ============================
    // SUCCESS
    // ============================

    return res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while creating booking.",
    });
  }
};

// ============================
// ADMIN - GET ALL BOOKINGS
// ============================

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("hotelId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get All Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while loading all bookings.",
    });
  }
};

// ============================
// ADMIN - CONFIRM BOOKING
// ============================

const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled booking cannot be confirmed.",
      });
    }

    booking.bookingStatus = "confirmed";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking confirmed successfully.",
      booking,
    });
  } catch (error) {
    console.error("Confirm Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while confirming booking.",
    });
  }
};

// ============================
// ADMIN - CANCEL BOOKING
// ============================

const adminCancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled.",
      });
    }

    booking.bookingStatus = "cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      booking,
    });
  } catch (error) {
    console.error("Admin Cancel Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while cancelling booking.",
    });
  }
};

// ============================
// ADMIN - DELETE BOOKING
// ============================

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting booking.",
    });
  }
};
// ============================
// GET MY BOOKINGS
// ============================

const getMyBookings = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Please login first.",
      });
    }

    const bookings = await Booking.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Get My Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while loading bookings.",
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    booking.bookingStatus = "cancelled";

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Cancel Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while cancelling booking",
    });
  }
};
// ============================
// ADMIN - GET BOOKING REVENUE / PROFIT
// ============================

const getBookingStats = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $match: {
          bookingStatus: "confirmed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          confirmedBookings: { $sum: 1 },
        },
      },
    ]);

    const stats = result[0] || {
      totalRevenue: 0,
      confirmedBookings: 0,
    };

    return res.status(200).json({
      success: true,
      totalRevenue: stats.totalRevenue,
      totalProfit: stats.totalRevenue,
      confirmedBookings: stats.confirmedBookings,
    });
  } catch (error) {
    console.error("Get Booking Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while calculating booking revenue.",
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,

  // Admin
  getAllBookings,
  getBookingStats,
  confirmBooking,
  adminCancelBooking,
  deleteBooking,
};
