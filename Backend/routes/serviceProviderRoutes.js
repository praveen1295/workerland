const express = require("express");
const {
  getServiceProviderInfoController,
  updateProfileController,
  getServiceProviderByIdController,
  serviceProviderAppointmentsController,
  updateBookingStatusController,
  createReviewController,
  getServiceProviderReviewsController,
  updateAvailabilityController,
  getBookingById,
} = require("../controllers/serviceProviderCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  findLocalAreasServiceProviders,
} = require("../controllers/serviceProviderCtrl");
const router = express.Router();

//POST SINGLE Service Provider INFO
router.post(
  "/getServiceProviderInfo",
  authMiddleware,
  getServiceProviderInfoController
);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE Service Provider INFO
router.post(
  "/getServiceProviderById",
  authMiddleware,
  getServiceProviderByIdController
);

//GET Appointments
router.get(
  "/serviceProvider-bookings",
  authMiddleware,
  serviceProviderAppointmentsController
);

//POST Update Status
router.post(
  "/updateBookingStatus",
  authMiddleware,
  updateBookingStatusController
);

router.post(
  "/local-service-provider-list",
  authMiddleware,
  findLocalAreasServiceProviders
);

router.post("/createReview", authMiddleware, createReviewController);
router.get(
  "/getReviews/:serviceProviderId/:page/:pageSize",
  authMiddleware,
  getServiceProviderReviewsController
);

router.post(
  "/updateAvailability",
  authMiddleware,
  updateAvailabilityController
);
router.post("/getBookingById", authMiddleware, getBookingById);

module.exports = router;
