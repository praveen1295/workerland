const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const serviceProviderModel = require("../models/serviceProviderModel");
const bookingModel = require("../models/bookingModel");
const moment = require("moment");
const connectDB = require("../config/db");
const axios = require("axios");
const textflow = require("textflow.js");
// const { G_response } = require("../dummy");
const { generateDateObject, timeSlotsWithStatus } = require("../utils");
const adminRequestsModel = require("../models/adminRequestsModel");
const pushTokenModel = require("../models/pushTokenModal");
textflow.useKey(process.env.TEXTFLOW_KEY);

var cron = require("node-cron");

console.log("push notification cgtr");

const { Expo } = require("expo-server-sdk");
const { sendNotification } = require("../utils");
console.log(
  "process.env.EXPO_ACCESS_TOKEN",
  process.env.EXPO_ACCESS_TOKEN,
  process.env.PORT
);

// const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
const expo = new Expo();

const sendNotificationToAll = async (req, res) => {
  const { title, body } = req.body;

  // Retrieve all registered Expo Push Tokens
  const expoPushTokens = await pushTokenModel.find({}, "token");

  // Prepare the push notifications
  const messages = expoPushTokens.map(({ token }) => ({
    to: token,
    sound: "default",
    title,
    body,
    data: { title, body },
  }));

  const notificationResponses = [];
  expoPushTokens.forEach(async ({ token }) => {
    const response = await sendNotification(title, body, token);
    notificationResponses.push(response);
  });

  // Send push notifications using the imported function
  // const notificationResponses = await sendNotification(title, body, token);

  if (notificationResponses.length > 0) {
    res.status(200).json({
      status: "success",
      message: "Push notifications sent successfully",
    });
  } else {
    return res.status(400).json({ error: "not getting devices" });
  }
};

const pushNotificationToken = async (req, res) => {
  const { expoPushToken } = req.body;
  console.log("cccccc");

  if (!Expo.isExpoPushToken(expoPushToken)) {
    return res.status(400).json({ error: "Invalid Expo Push Token" });
  }

  // Save Expo Push Token to MongoDB
  try {
    await pushTokenModel.create({ token: expoPushToken });
    return res
      .status(200)
      .json({ message: "Expo Push Token registered successfully" });
  } catch (error) {
    console.error("Error saving Expo Push Token to MongoDB:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  pushNotificationToken,
  sendNotificationToAll,
};
