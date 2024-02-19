const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    serviceProviderId: {
      type: String,
      // required: true,
    },
    serviceProviderUserId: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      default: "",
    },
    serviceProviderInfo: {
      type: Object,
      // required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected", "cancelled"],
      default: "pending",
    },
    cancellationReason: {
      type: Object,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
