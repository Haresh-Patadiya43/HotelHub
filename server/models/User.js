const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    // Authentication
    // =========================

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // =========================
    // Profile
    // =========================

    username: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    dob: {
      type: Date,
    },

    gender: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    zipCode: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    // =========================
    // Admin Status
    // =========================

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    // =========================
    // Forgot Password
    // =========================

    resetOtp: {
      type: String,
      default: null,
    },

    resetOtpExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);