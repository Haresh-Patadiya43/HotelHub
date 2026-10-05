const User = require("../models/User");
const Booking = require("../models/Booking");

// ============================
// Get All Users - Admin
// ============================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -resetOtp -resetOtpExpiry")
      .sort({ createdAt: -1 })
      .lean();

    const usersWithBookings = await Promise.all(
      users.map(async (user) => {
        const bookingCount = await Booking.countDocuments({
          userId: user._id,
          bookingStatus: { $ne: "cancelled" },
        });

        return {
          ...user,
          bookings: bookingCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: usersWithBookings.length,
      users: usersWithBookings,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ============================
// Delete User - Admin
// ============================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ============================
// Get Logged-in User Profile
// ============================
const getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User information not found.",
      });
    }

    const user = await User.findById(req.user.id)
      .select("-password -resetOtp -resetOtpExpiry")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ============================
// Update User Profile
// ============================
const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User information not found.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      name,
      username,
      phone,
      dob,
      gender,
      country,
      state,
      city,
      zipCode,
      address,
      website,
      facebook,
      instagram,
      linkedin,
      about,
      profileImage,
    } = req.body;

    // ============================
    // Update Profile Fields
    // ============================

    if (name !== undefined) {
      user.name = name;
    }

    if (username !== undefined) {
      user.username = username;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (dob !== undefined) {
      user.dob = dob ? new Date(dob) : null;
    }

    if (gender !== undefined) {
      user.gender = gender;
    }

    if (country !== undefined) {
      user.country = country;
    }

    if (state !== undefined) {
      user.state = state;
    }

    if (city !== undefined) {
      user.city = city;
    }

    if (zipCode !== undefined) {
      user.zipCode = zipCode;
    }

    if (address !== undefined) {
      user.address = address;
    }

    if (website !== undefined) {
      user.website = website;
    }

    if (facebook !== undefined) {
      user.facebook = facebook;
    }

    if (instagram !== undefined) {
      user.instagram = instagram;
    }

    if (linkedin !== undefined) {
      user.linkedin = linkedin;
    }

    if (about !== undefined) {
      user.about = about;
    }

    // Important:
    // Allows profile image to be removed by sending ""
    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select("-password -resetOtp -resetOtpExpiry")
      .lean();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// ============================
// EXPORTS
// ============================
module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
};