const express = require("express");
const router = express.Router();

const Hotel = require("../models/Hotel");
const upload = require("../middleware/upload");

// ==========================================
// GET ALL HOTELS
// ==========================================
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      hotels,
    });
  } catch (error) {
    console.error("Get all hotels error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch hotels",
    });
  }
});

// ==========================================
// GET HOTEL BY ID
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.json({
      success: true,
      hotel,
    });
  } catch (error) {
    console.error("Get hotel by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch hotel",
    });
  }
});

// ==========================================
// ADD HOTEL
// ==========================================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Hotel image is required",
      });
    }

    let amenities = [];

    if (req.body.amenities) {
      try {
        amenities = JSON.parse(req.body.amenities);
      } catch {
        amenities = [];
      }
    }

    const hotel = await Hotel.create({
      name: req.body.name,
      location: req.body.location,
      price: Number(req.body.price),
      rating: Number(req.body.rating) || 4.5,
      reviews: Number(req.body.reviews) || 0,
      description: req.body.description,
      amenities,
      image: `http://localhost:5000/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      message: "Hotel added successfully",
      hotel,
    });
  } catch (error) {
    console.error("Add hotel error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to add hotel",
    });
  }
});

// ==========================================
// UPDATE HOTEL
// ==========================================
router.put("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: Number(req.body.price),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.json({
      success: true,
      message: "Hotel updated successfully",
      hotel,
    });
  } catch (error) {
    console.error("Update hotel error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update hotel",
    });
  }
});

// ==========================================
// DELETE HOTEL
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    console.error("Delete hotel error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete hotel",
    });
  }
});

module.exports = router;