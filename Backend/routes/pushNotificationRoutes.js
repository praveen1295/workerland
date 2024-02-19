const express = require("express");
const {
  pushNotificationToken,
  sendNotificationToAll,
} = require("../controllers/pushNotificationCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
// Endpoint to register Expo Push Token
router.post("/createPushToken", authMiddleware, pushNotificationToken);

router.post(
  "/sendPushNotificationToAll",
  authMiddleware,
  sendNotificationToAll
);

module.exports = router;
