const express = require("express");
const router = express.Router();

const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

// ==========================================
// GET TOTAL ROOM COUNT
// ==========================================
router.get("/count", async (req, res) => {
  try {
    const count = await Room.countDocuments();

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Room count error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get room count",
    });
  }
});

// ==========================================
// GET ALL ROOMS
// ==========================================
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("hotel", "name location")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    console.error("Get all rooms error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
    });
  }
});

// ==========================================
// GET ROOMS BY HOTEL
// ==========================================
router.get("/hotel/:hotelId", async (req, res) => {
  try {
    const rooms = await Room.find({
      hotel: req.params.hotelId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    console.error("Get hotel rooms error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch hotel rooms",
    });
  }
});

// ==========================================
// ADD ROOM
// ==========================================
router.post("/", async (req, res) => {
  try {
    const {
      hotel,
      roomType,
      price,
      capacity,
      guests,
      image,
      available,
    } = req.body;

    // ==========================================
    // CHECK HOTEL
    // ==========================================

    if (!hotel) {
      return res.status(400).json({
        success: false,
        message: "Hotel is required",
      });
    }

    const existingHotel = await Hotel.findById(hotel);

    if (!existingHotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    // ==========================================
    // SUPPORT BOTH "capacity" AND "guests"
    // ==========================================

    const roomGuests =
      guests !== undefined && guests !== null
        ? guests
        : capacity;

    // ==========================================
    // VALIDATE REQUIRED FIELDS
    // ==========================================

    if (!roomType) {
      return res.status(400).json({
        success: false,
        message: "Room type is required",
      });
    }

    if (
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Room price is required",
      });
    }

    if (
      roomGuests === undefined ||
      roomGuests === null ||
      roomGuests === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Room capacity/guests is required",
      });
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Room image is required",
      });
    }

    // ==========================================
    // CONVERT NUMBERS
    // ==========================================

    const roomPrice = Number(price);
    const numberOfGuests = Number(roomGuests);

    if (Number.isNaN(roomPrice) || roomPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid room price",
      });
    }

    if (
      Number.isNaN(numberOfGuests) ||
      numberOfGuests <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid room capacity",
      });
    }

    // ==========================================
    // CREATE ROOM
    // ==========================================

    const room = await Room.create({
      hotel,
      roomType,

      price: roomPrice,

      // IMPORTANT:
      // Room model expects "guests"
      guests: numberOfGuests,

      image,

      available:
        available !== undefined
          ? Boolean(available)
          : true,
    });

    // ==========================================
    // SUCCESS
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "Room added successfully",
      room,
    });
  } catch (error) {
    console.error("Add room error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to add room",
    });
  }
});

// ==========================================
// UPDATE ROOM
// ==========================================
router.put("/:id", async (req, res) => {
  try {
    const {
      roomType,
      price,
      capacity,
      guests,
      image,
      available,
    } = req.body;

    // ==========================================
    // CHECK ROOM
    // ==========================================

    const existingRoom = await Room.findById(
      req.params.id
    );

    if (!existingRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // ==========================================
    // SUPPORT BOTH "capacity" AND "guests"
    // ==========================================

    const roomGuests =
      guests !== undefined && guests !== null
        ? guests
        : capacity;

    // ==========================================
    // BUILD UPDATE OBJECT
    // ==========================================

    const updateData = {};

    if (roomType !== undefined) {
      updateData.roomType = roomType;
    }

    if (
      price !== undefined &&
      price !== null &&
      price !== ""
    ) {
      const roomPrice = Number(price);

      if (
        Number.isNaN(roomPrice) ||
        roomPrice < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid room price",
        });
      }

      updateData.price = roomPrice;
    }

    if (
      roomGuests !== undefined &&
      roomGuests !== null &&
      roomGuests !== ""
    ) {
      const numberOfGuests =
        Number(roomGuests);

      if (
        Number.isNaN(numberOfGuests) ||
        numberOfGuests <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid room capacity",
        });
      }

      // IMPORTANT:
      // Use guests, NOT formData.capacity
      updateData.guests = numberOfGuests;
    }

    if (image !== undefined) {
      updateData.image = image;
    }

    if (available !== undefined) {
      updateData.available = Boolean(available);
    }

    // ==========================================
    // UPDATE ROOM
    // ==========================================

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room,
    });
  } catch (error) {
    console.error("Update room error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to update room",
    });
  }
});

// ==========================================
// DELETE ROOM
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(
      req.params.id
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.error("Delete room error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete room",
    });
  }
});

module.exports = router;