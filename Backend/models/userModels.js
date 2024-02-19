const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  phoneNumber: {
    type: String,
    required: [true, "phone no is required"],
    // unique: true,
  },
  email: {
    type: String,
    // required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  expoPushToken: {
    type: String,
    // required: true,
  },
  location: {
    type: Object,
    default: {},
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isServiceProvider: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    default: "",
    required: true,
  },
  subcategories: {
    type: Array,
    default: [],
    // required: true,
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
  profilePhotoUrl: {
    type: String,
    default: null,
  },
  aadharPhotoUrl: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
