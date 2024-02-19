const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyServiceProviderController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllServiceProvidersController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  getLocalAreasServiceProviders,
  verify,
  uploadImageController,
  getBookings,
  updateProfile,
  sendOtp,
  verifyOtp,
  forgetPassword,
} = require("../controllers/userCtrl");
const { upload } = require("../middlewares/fileUploadMiddleware");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post(
  "/register",
  [
    // Add register route validation middleware here
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],

  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "aadharPhoto", maxCount: 1 },
  ]),
  registerController
);
//otp verify
router.post("/verify", verify);
router.post("/sendOtp", sendOtp);

router.post("/verifyOtp", verifyOtp);

//Auth || POST
router.get("/getUserData", authMiddleware, authController);

//APply ServiceProvider || POST
router.post(
  "/apply-service-provider",
  authMiddleware,
  applyServiceProviderController
);

//Notifiaction  ServiceProvider || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
//Notifiaction  ServiceProvider || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL DOC
router.get(
  "/getAllServiceProviders",
  authMiddleware,
  getAllServiceProvidersController
);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddleware, bookAppointmentController);

router.post(
  "/forgetPassword",
  //  authMiddleware,
  forgetPassword
);

//Booking Avliability
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);

//Appointments List
router.get("/user-bookings", authMiddleware, userAppointmentsController);

// Fetch nearest service providers

router.post(
  "/local-service-provider-list",
  authMiddleware,
  getLocalAreasServiceProviders
);

router.post("/getBookingHistory", authMiddleware, getBookings);

// UploadImage route

router.post(
  "/uploadImages",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "aadharPhoto", maxCount: 1 },
  ]),
  authMiddleware,
  uploadImageController
);

router.post(
  "/updateProfile",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "aadharPhoto", maxCount: 1 },
  ]),
  authMiddleware,
  updateProfile
);

module.exports = router;
