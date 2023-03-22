const { Schema, model, Types } = require("mongoose");

const hotelSchema = new Schema({
  productName: {
    type: String,
    required: true,
    minlength: [3, "Hotel Name must be at least 4 characters long"],
  },
  description: {
    type: String,
    required: true,
    minlength: [10, "Description must be at least 10 characters long"],
  },
  price: {
    type: Number,
    required: true,
    min: [0.01, "Price must be a positive number"],
  },
  imageUrls: [
    { type: String, required: [true, "At least one image is required!"] },
  ],
  sku: { type: Number },
  new: { type: Boolean },
  sizes: {
    type: [String],
    required: true,
    minlength: [1, "At least one size is required"],
  },
  colors: {
    type: [String],
    required: true,
    minlength: [1, "At least one color is required"],
  },
});

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
