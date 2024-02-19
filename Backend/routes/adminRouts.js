const express = require("express");
const {
  getAllUsersController,
  getAllServiceProvidersController,
  changeAccountStatusController,
  getRequests,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET METHOD || Service Provider
router.get(
  "/getAllServiceProviders",
  authMiddleware,
  getAllServiceProvidersController
);

//POST ACCOUNT STATUS

router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

router.post("/getRequests", authMiddleware, getRequests);

module.exports = router;
