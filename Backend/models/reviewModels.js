const mongoose = require("mongoose");

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Assuming you have a User model
    },
    serviceProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ServiceProvider", // Assuming you have a ServiceProvider model
    },
    userProfileImageUrl: {
      type: String,
    },
    userName: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
