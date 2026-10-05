const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    hotelName: {
      type: String,
      required: true,
    },

    hotelLocation: {
      type: String,
      required: true,
    },

    hotelImage: {
      type: String,
      required: true,
    },

    roomName: {
      type: String,
      required: true,
    },

    roomImage: {
      type: String,
      required: true,
    },

    roomPrice: {
      type: Number,
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    nights: {
      type: Number,
      required: true,
    },

    guestName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    // Billing
    taxes: {
      type: Number,
      required: true,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    // Booking status
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "confirmed",
    },

    // Payment
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
      default: "online",
    },

    // Invoice
    invoiceNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    invoiceGenerated: {
      type: Boolean,
      default: false,
    },

    invoiceGeneratedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);