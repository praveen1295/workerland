const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "first name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "phone no is required"],
      // unique: true,
    },
    email: {
      type: String,
      // required: [true, "email is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    location: {
      type: Object,
      default: {},
    },
    website: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "category is require"],
      default: [],
    },

    subcategories: {
      type: Array,
      default: [],
      required: true,
    },

    timeSlots: {
      type: Object,
      required: true,
      default: {},
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const serviceProviderModel = mongoose.model(
  "serviceProviders",
  serviceProviderSchema
);
module.exports = serviceProviderModel;
