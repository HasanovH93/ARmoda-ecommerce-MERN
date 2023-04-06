const { Schema, model, Types } = require("mongoose");

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Hotel Name must be at least 4 characters long"],
  },
  fullDescription: {
    type: String,
    required: true,
    minlength: [10, "Description must be at least 10 characters long"],
  },
  price: {
    type: Number,
    required: true,
    min: [0.01, "Price must be a positive number"],
  },
  image: [
    { type: String, required: [true, "At least one image is required!"] },
  ],
  sku: { type: Number },
  new: { type: Boolean },
  rating: { type: Number },
  variation: [
    {
      color: String,
      image: String,
      size: [
        {
          name: String,
          stock: Number,
        },
      ],
    },
  ],
  category: [{ type: String }],
  shortDescription: { type: String },
  createdAt: { type: Date, default: Date.now },
  discount: { type: number },
  offerEnd: { type: Date },
});

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
