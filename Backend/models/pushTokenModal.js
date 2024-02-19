const mongoose = require("mongoose");

const pushTokenSchema = new mongoose.Schema({
  token: String,
});

const pushTokenModel = mongoose.model("ExpoPushToken", pushTokenSchema);

module.exports = pushTokenModel;
