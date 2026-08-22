const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },

  roomType: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  guests: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);