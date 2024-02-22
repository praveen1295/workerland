const bookingModel = require("../models/bookingModel");
const moment = require("moment");
const reviewModel = require("../models/reviewModels");
const serviceProviderModel = require("../models/serviceProviderModel");
const userModel = require("../models/userModels");
const { sendNotification } = require("../utils");
const getServiceProviderInfoController = async (req, res) => {
  try {
    const serviceProvider = await serviceProviderModel.findOne({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "serviceProvider data fetch success",
      data: serviceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching ServiceProvider Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const serviceProvider = await serviceProviderModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "ServiceProvider Profile Updated",
      data: serviceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ServiceProvider Profile Update issue",
      error,
    });
  }
};

//get single service provider
const getServiceProviderByIdController = async (req, res) => {
  try {
    const serviceProvider = await serviceProviderModel.findOne({
      _id: req.body.serviceProviderId,
    });
    res.status(200).send({
      success: true,
      message: "Single Doc Info Fetched",
      data: serviceProvider,
      serviceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Single service provider info",
    });
  }
};

const serviceProviderAppointmentsController = async (req, res) => {
  try {
    const serviceProvider = await serviceProviderModel.findOne({
      userId: req.body.userId,
    });
    const bookings = await bookingModel.find({
      serviceProviderId: serviceProvider._id,
    });
    res.status(200).send({
      success: true,
      message: "ServiceProvider Appointments fetch Successfully",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateBookingStatusController = async (req, res) => {
  try {
    const { bookingId, status, message } = req.body;
    const bookings = await bookingModel.findByIdAndUpdate(
      bookingId,
      {
        status,
        cancellationReason: message,
      },
      { new: true }
    );

    const user = await userModel.findOne({ _id: bookings.userId });
    const notification = user.notification;
    notification.push({
      type: "accountVerification",
      title: "Account verification",
      message: `Your account request has ${status} by admin.`,
      onClickPath: "/notification",
    });
    await user.save();

    const messages = [
      {
        to: user.expoPushToken,
        sound: "default",
        title: "Appointment verification",
        body: `🎉 Exciting News! your account verification status has been ${status}. 🚀`,
        // data: { title, body },
      },
    ];

    // Send push notifications using the imported function
    const notificationResponses = await sendNotification(
      "Appointment verification",
      `🎉 Exciting News! your account verification status has been ${status}. 🚀`,
      user.expoPushToken,
      {
        title: "Appointment verification",
        body: `🎉 Exciting News! your account verification status has been ${status}. 🚀`,
      }
    );

    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

const updateBookingStatusController11 = async (req, res) => {
  try {
    const { bookingId, status, message, userId } = req.body;

    const checkBooking = await bookingModel.findById(bookingId);
    if (
      checkBooking.status === "booked" ||
      checkBooking.status === "completed" ||
      checkBooking.status === "cancelled"
    ) {
      return res.status(201).send({
        success: false,
        message: "Appointment already booked/completed",
        checkBooking,
      });
    }

    if (status === "cancelled") {
      if (
        checkBooking.userId !== userId &&
        checkBooking.serviceProviderUserId !== userId
      ) {
        return res.status(201).send({
          success: false,
          message: "You are not allowed to change booking status",
          checkBooking,
          userId,
        });
      }
    }

    const bookingData = { status, cancellationReason: message };
    const serviceProvider = await serviceProviderModel.findOne({
      userId: userId,
    });

    console.log("serviceProvider", serviceProvider, userId);

    if (serviceProvider) {
      bookingData.serviceProviderId = serviceProvider._id;
      bookingData.serviceProviderUserId = serviceProvider.userId;
    }

    const bookings = await bookingModel.findByIdAndUpdate(
      bookingId,
      bookingData,
      { new: true }
    );

    const slotToUpdate = serviceProvider.timeSlots?.[bookings?.date];

    if (!slotToUpdate) {
      serviceProvider.timeSlots[bookings?.date] = [
        { timeSlot: bookings.time, status: "booked" },
      ];
    } else {
      const existingSlotIndex = slotToUpdate.findIndex(
        (slot) => slot.timeSlot === bookings.timeSlot
      );

      if (existingSlotIndex === -1) {
        slotToUpdate.push({ timeSlot: bookings.timeSlot, status: "booked" });
      } else {
        return res.status(400).send({
          success: false,
          message: "Time slot is already booked for the selected date.",
        });
      }
    }

    // Save the updated service provider information
    await serviceProviderModel.updateOne(
      { _id: serviceProvider._id },
      { $set: { timeSlots: serviceProvider.timeSlots } }
    );

    const user = await userModel.findOne({ _id: bookings.userId });
    const notification = user.notification;
    notification.push({
      type: "statusUpdate",
      title: "status-updated",
      message: `your appointment booking status has been ${status}`,
      data: bookings,
      onCLickPath: "/serviceProvider-bookings",
    });
    await user.save();

    const messages = [
      {
        to: user.expoPushToken,
        sound: "default",
        title: "new service booking request",
        body: `🎉 Exciting News! your appointment booking status has been ${status}. 🚀`,
        // data: { title, body },
      },
    ];

    // Send push notifications using the imported function
    const notificationResponses = await sendNotification(
      "Appointment status updated",
      `🎉 Exciting News! your appointment booking status has been ${status}. 🚀`,
      user.expoPushToken,
      {
        title: "Appointment status updated",
        body: `🎉 Exciting News! your appointment booking status has been ${status}. 🚀`,
      }
    );

    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

const updateAvailabilityController = async (req, res) => {
  const { date, timeSlot, userId, status } = req.body;

  if (status !== "available" && status !== "notAvailable") {
    return res.status(400).send({
      success: false,
      message: "Invalid status. Status must be 'available' or 'notAvailable'.",
    });
  }

  try {
    const bookingDateTime = moment(`${date} ${timeSlot}`, "YYYY-MM-DD h:mm A");

    // Get the current date and time
    const currentDateTime = moment();

    const appointmentTimePassedFlag = currentDateTime.isAfter(bookingDateTime);

    if (appointmentTimePassedFlag) {
      return res.status(201).send({
        success: true,
        message: "Its look like past data or time",
        bookingDateTime,
      });
    }

    const newDate = moment(req.body.date, "YYYY-MM-DD").toISOString();
    req.body.time = timeSlot;

    const serviceProvider = await serviceProviderModel.findOne({
      userId: userId,
    });

    if (!serviceProvider) {
      return res.status(404).send({
        success: false,
        message: "Service Provider not found.",
      });
    }

    const slotToUpdate = serviceProvider.timeSlots[date];

    if (!slotToUpdate) {
      serviceProvider.timeSlots[date] = [
        { timeSlot: timeSlot, status: status },
      ];
    } else {
      const existingSlotIndex = slotToUpdate.findIndex(
        (slot) => slot.timeSlot === timeSlot
      );

      if (existingSlotIndex === -1) {
        slotToUpdate.push({ timeSlot: timeSlot, status: status });
      } else {
        if (slotToUpdate[existingSlotIndex].status === "booked") {
          return res.status(400).send({
            success: false,
            message: "Time slot is already booked for the selected date.",
          });
        } else {
          slotToUpdate[existingSlotIndex].status = status;
        }
      }
    }

    // Save the updated service provider information
    await serviceProviderModel.updateOne(
      { userId: userId },
      { $set: { timeSlots: serviceProvider.timeSlots } }
    );

    res.status(200).send({
      success: true,
      message: "Availability status changed successfully",
      serviceProvider,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while change appointment availability status",
    });
  }
};

const findLocalAreasServiceProviders = async (req, res) => {
  const { userId, searchStr } = req.body;
  try {
    const userData = await userModel.findOne({ _id: userId });

    const { location: userLocation } = userData;
    console.log("userLocation", userLocation);

    const minDistance = 500;
    const maxDistance = 120000;

    await serviceProviderModel.collection.createIndex(
      { location: "2dsphere" },
      (err, result) => {
        if (err) {
          console.error("Error creating index:", err);
        } else {
          console.log("Index created successfully:", result);
        }
      }
    );

    // const serviceProviders = await serviceProviderModel.find({
    //   location: {
    //     $near: {
    //       $geometry: {
    //         type: "Point",
    //         coordinates: userLocation.coordinates,
    //       },
    //       $minDistance: minDistance,
    //       $maxDistance: maxDistance,
    //     },
    //   },
    // });

    const serviceProviders = await serviceProviderModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: userLocation.coordinates,
          },
          distanceField: "distance",
          maxDistance: 12000,
          spherical: true,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "Service Providers Fetch Successfully",
      data: serviceProviders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Finding Service Provider",
    });
  }
};

const createReviewController = async (req, res) => {
  try {
    const { userId, serviceProviderId, rating, comment } = req.body;
    if (!userId || !serviceProviderId || !rating || !comment) {
      return res.status(400).send({
        success: false,
        message: "Invalid input. Please provide all required parameters.",
      });
    }

    const existingReview = await reviewModel.findOne({
      userId,
      serviceProviderId,
    });
    // if (existingReview) {
    //   return res.status(400).send({
    //     success: false,
    //     message:
    //       "You have already submitted a review for this service provider.",
    //   });
    // }

    if (rating < 1 || rating > 5) {
      return res.status(400).send({
        success: false,
        message:
          "Invalid rating value. Please provide a rating between 1 and 5.",
      });
    }

    const user = await userModel.findById(userId);

    // Create a new review
    const newReview = new reviewModel({
      userId,
      serviceProviderId,
      rating,
      comment,
      userName: user.name,
      userProfileImageUrl: user.profilePhotoUrl,
    });
    await newReview.save();

    // Update the service provider's overall rating
    const serviceProvider = await serviceProviderModel.findById(
      serviceProviderId
    );
    if (!serviceProvider) {
      return res.status(404).send({
        success: false,
        message: "Service Provider not found.",
      });
    }

    serviceProvider.ratingCount += 1;
    serviceProvider.totalRating += rating;
    serviceProvider.averageRating =
      serviceProvider.totalRating / serviceProvider.ratingCount;

    // Save the updated service provider information
    await serviceProvider.save();

    res.status(201).send({
      success: true,
      message: "Review submitted successfully",
      review: newReview,
      serviceProvider,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while submitting review",
    });
  }
};

// reviewController.js

// reviewController.js

const getServiceProviderReviewsController = async (req, res) => {
  try {
    const { serviceProviderId, page = 1, pageSize = 10 } = req.params;

    const skip = (page - 1) * pageSize;

    const [reviews, total] = await Promise.all([
      reviewModel
        .find({ serviceProviderId })
        .skip(skip)
        .limit(Number(pageSize))
        .exec(),
      reviewModel.countDocuments({ serviceProviderId }).exec(),
    ]);

    res.status(200).send({
      success: true,
      reviews,
      total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching reviews for the service provider",
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await bookingModel.findById(bookingId);

    if (!booking) {
      return res.status(201).send({
        success: false,
        message: "booking not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "get booking successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

module.exports = {
  getServiceProviderInfoController,
  updateProfileController,
  getServiceProviderByIdController,
  serviceProviderAppointmentsController,
  updateBookingStatusController: updateBookingStatusController11,
  getBookingById,
  findLocalAreasServiceProviders,
  createReviewController,
  getServiceProviderReviewsController,
  updateAvailabilityController,
};
