const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // =========================
    // Authentication
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
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
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    dob: {
      type: Date,
      default: null,
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
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    facebook: {
      type: String,
      default: "",
      trim: true,
    },

    instagram: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
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