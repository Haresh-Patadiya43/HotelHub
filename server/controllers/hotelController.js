const Hotel = require("../models/Hotel");

// =====================================================
// GET ALL HOTELS
// =====================================================

const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      hotels,
    });
  } catch (error) {
    console.error("Get hotels error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch hotels",
    });
  }
};

// =====================================================
// ADD HOTEL
// =====================================================

const createHotel = async (req, res) => {
  try {
    const {
      name,
      location,
      price,
      rating,
      reviews,
      description,
      image,
      amenities,
    } = req.body;

    // Basic validation
    if (
      !name?.trim() ||
      !location?.trim() ||
      !price ||
      !description?.trim() ||
      !image?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, location, price, description and image are required",
      });
    }

    const hotel = await Hotel.create({
      name: name.trim(),
      location: location.trim(),
      price: Number(price),
      rating: rating ? Number(rating) : 4.5,
      reviews: reviews ? Number(reviews) : 0,
      description: description.trim(),
      image: image.trim(),
      amenities: Array.isArray(amenities)
        ? amenities
        : [],
    });

    res.status(201).json({
      success: true,
      message: "Hotel added successfully",
      hotel,
    });
  } catch (error) {
    console.error("Create hotel error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add hotel",
    });
  }
};

// =====================================================
// UPDATE HOTEL
// =====================================================

const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const hotel = await Hotel.findByIdAndUpdate(
      id,
      {
        name,
        price,
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

    res.status(200).json({
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
};

// =====================================================
// DELETE HOTEL
// =====================================================

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findByIdAndDelete(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.status(200).json({
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
};

module.exports = {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
};