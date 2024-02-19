const mongoose = require("mongoose");

const adminRequestsSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    profilePhotoUrl: {
      type: String,
      default: "",
    },
    aadharPhotoUrl: {
      type: String,
      default: "",
    },
    isServiceProvider: {
      type: Boolean,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved"],
      default: "pending",
    },
    onClickPath: {
      type: String,
    },
  },
  { timestamps: true }
);

const adminRequestsModel = mongoose.model("adminrequests", adminRequestsSchema);

module.exports = adminRequestsModel;
