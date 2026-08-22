const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

// Logged-in user
router.get("/profile", protect, getProfile);

// Update logged-in user
router.put("/profile", protect, updateProfile);

// Admin - get all users
router.get("/admin/users", getAllUsers);

// Admin - delete user
router.delete("/admin/users/:id", deleteUser);

module.exports = router;