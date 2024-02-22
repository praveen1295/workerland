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
const otpGenerator = require("otp-generator");
const {
  generateDateObject,
  timeSlotsWithStatus,
  sendNotification,
} = require("../utils");
const adminRequestsModel = require("../models/adminRequestsModel");

textflow.useKey(process.env.TEXTFLOW_KEY);

var cron = require("node-cron");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log("twilio", accountSid, authToken);
const client = require("twilio")(accountSid, authToken);

let otpStore = {};
let user;
function splitCamelCase(inputString) {
  // Use a regular expression to match capital letters
  var words = inputString.split(/(?=[A-Z])/);

  // Capitalize the first letter of the first word
  // words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

  // Join the words with a space to create a sentence
  var sentence = words.join(" ");

  return sentence;
}

//register callback
const registerController = async (req, res) => {
  const {
    isUser,
    isServiceProvider,
    name,
    phoneNumber,
    email,
    password,
    location,
    category,
    otp,
    subcategories,
    expoPushToken,
  } = req.body;

  try {
    const existingUser = await userModel.findOne({ phoneNumber }).exec();

    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }

    // var result = await textflow.verifyCode("+91" + phoneNumber, otp);

    // if (!result.valid) {
    //   return res.status(400).json({ success: false, result });
    // }

    const { profilePhoto: profilePhotoArr, aadharPhoto: aadharPhotoArr } =
      req.files;

    let profileImg = "";
    let aadharImg = "";
    if (profilePhotoArr?.length) {
      profileImg = profilePhotoArr[0].originalname.split(" ").join("_");
    }

    if (aadharPhotoArr?.length) {
      aadharImg = aadharPhotoArr[0].originalname.split(" ").join("_");
    }

    const profilePhotoUrl = profileImg
      ? process.env.BACKEND_URL + "/static/" + profileImg
      : "";
    const aadharPhotoUrl = aadharImg
      ? process.env.BACKEND_URL + "/static/" + aadharImg
      : "";
    const add = req.body.address;

    const G_response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        add
      )}&key=${process.env.GOOGLE_GEOLOCATION_KEY}`
    );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const { lat, lng } = G_response.data.results[0].geometry.location;
    req.body.location = { type: "Point", coordinates: [lat, lng] };

    const userData = {
      ...req.body,
      category: splitCamelCase(category).toLowerCase(),
      profilePhotoUrl,
      aadharPhotoUrl,
    };

    const adminUser = await userModel.findOne({ isAdmin: true });
    let requestData = {};

    const notification = adminUser.notification;

    const newUserDocument = new userModel(userData);
    const newUser = await newUserDocument.save();

    let serviceProvider = {};

    if (isServiceProvider === "false" || isServiceProvider === false) {
      requestData = {
        adminId: adminUser._id,
        userId: newUser._id,
        name: newUser.name,
        profilePhotoUrl: newUser.profilePhotoUrl,
        aadharPhotoUrl: newUser.aadharPhotoUrl,
        isServiceProvider: false,
        onClickPath: "/admin/user",
      };

      notification.push({
        type: "newAccountRequests",
        title: "new worker request",
        message: `${newUser.name} Has Applied For A worker Account`,
        onClickPath: "/admin/user",

        data: {
          userId: newUser._id,
          name: newUser.name,
          profilePhotoUrl: newUser.profilePhotoUrl,
          aadharPhotoUrl: newUser.aadharPhotoUrl,
        },
      });

      await userModel.findByIdAndUpdate(adminUser._id, { notification });

      const messages = [
        {
          to: adminUser.expoPushToken,
          sound: "default",
          title: "new worker request",
          body: `🎉 Exciting News! ${newUser.name} Has Applied For A worker Account.🚀`,
          // data: { title, body },
        },
      ];

      // Send push notifications using the imported function
      const notificationResponses = await sendNotification(
        "new worker request",
        `🎉 Exciting News! ${newUser.name} Has Applied For A worker Account.🚀`,
        adminUser.expoPushToken,
        {
          title: "new worker request",
          body: `🎉 Exciting News! ${newUser.name} Has Applied For A worker Account.🚀`,
        }
      );
    } else if (isServiceProvider === "true" || isServiceProvider === true) {
      requestData = {
        adminId: adminUser._id,
        userId: newUser._id,
        name: newUser.name,
        profilePhotoUrl: newUser.profilePhotoUrl,
        aadharPhotoUrl: newUser.aadharPhotoUrl,
        isServiceProvide: true,
        onClickPath: "/admin/user",
      };

      notification.push({
        type: "newAccountRequests",
        title: "new work provider request",
        message: `${newUser.name} has applied for work provider account`,
        onClickPath: "/admin/serviceProviders",

        data: {
          userId: newUser._id,
          name: newUser.name,
          profilePhotoUrl: newUser.profilePhotoUrl,
          aadharPhotoUrl: newUser.aadharPhotoUrl,
        },
      });

      await userModel.findByIdAndUpdate(adminUser._id, { notification });

      const messages = [
        {
          to: adminUser.expoPushToken,
          sound: "default",
          title: "new work provider request",
          body: `🎉 Exciting News! ${newUser.name} Has Applied For A work provider Account.🚀`,
          // data: { title, body },
        },
      ];

      // Send push notifications using the imported function
      // const notificationResponses = await sendNotification(
      //   "new work provider request",
      //   `🎉 Exciting News! ${newUser.name} Has Applied For A work provider Account.🚀`,
      //   messages
      // );

      const notificationResponses = await sendNotification(
        "new work provider request",
        `🎉 Exciting News! ${newUser.name} Has Applied For A work provider Account.🚀`,
        adminUser.expoPushToken,
        {
          title: "new work provider request",
          body: `🎉 Exciting News! ${newUser.name} Has Applied For A work provider Account.🚀`,
        }
      );
    }

    if (isServiceProvider === "true" || isServiceProvider === true) {
      const user = await userModel.findOne({
        phoneNumber: req.body.phoneNumber,
      });

      const uu = {
        userId: user._id,
        ...req.body,
        category: splitCamelCase(category).toLowerCase(),
        subcategories: subcategories.map((subcategory, index) => {
          return splitCamelCase(subcategory).toLowerCase();
        }),
      };
      serviceProvider = uu;

      const newServiceProvider = await serviceProviderModel(serviceProvider);
      await newServiceProvider.save();
    }

    const newAdminRequest = await adminRequestsModel(requestData);
    await newAdminRequest.save();
    res.status(201).send({
      success: true,
      message: "Register Successfully",
      user: newUser,
      serviceProvider: serviceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const uploadImageController = async (req, res) => {
  const { userId } = req.body;

  try {
    const { profilePhoto: profilePhotoArr, aadharPhoto: aadharPhotoArr } =
      req.files;

    let profileImg = "";
    let aadharImg = "";

    if (profilePhotoArr?.length) {
      profileImg = profilePhotoArr[0].originalname.split(" ").join("_");
    }

    if (aadharPhotoArr?.length) {
      aadharImg = aadharPhotoArr[0].originalname.split(" ").join("_");
    }

    const profilePhotoUrl = profileImg
      ? process.env.BACKEND_URL + "/static/" + profileImg
      : "";
    const aadharPhotoUrl = aadharImg
      ? process.env.BACKEND_URL + "/static/" + aadharImg
      : "";

    // Find the user by ID and update profileUrl and aadharUrl

    const filter = { _id: userId };
    const update = {
      $set: {
        profilePhotoUrl: profilePhotoUrl,
        aadharPhotoUrl: aadharPhotoUrl,
      },
    };

    const options = { new: true };

    const updatedUser = await userModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (updatedUser) {
      res.status(200).json({ success: true, user: updatedUser });
    } else {
      // No document matched the filter
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const sendOtp = async (req, res) => {
  const { phoneNumber, forgetPassword } = req.body;

  if (!phoneNumber) {
    return res.status(400).send("Phone number is required");
  }

  try {
    const user = await userModel.findOne({ phoneNumber });
    if (forgetPassword && !user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    otpStore[phoneNumber] = otp;

    console.log("otpStore111", otpStore);

    await client.messages.create({
      body: `Your OTP verification for ${phoneNumber} is: ${otp}`,
      from: "+16592712981",
      // messagingServiceSid: "MGc8d7546f15822febc2f8637bdf8c97d1",
      to: `+91${phoneNumber}`,
    });

    res.status(200).send("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).send("Failed to send OTP");
  }
};

const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  console.log("otpStore222", phoneNumber, otp);

  if (!phoneNumber || !otp) {
    return res
      .status(400)
      .send({ success: false, message: "Phone number and OTP are required" });
  }

  const storedOTP = otpStore[phoneNumber];

  if (!storedOTP) {
    return res.status(400).send({
      success: false,
      message: "OTP not found. Please request a new one.",
    });
  }

  if (otp === storedOTP) {
    delete otpStore[phoneNumber];
    return res
      .status(200)
      .send({ success: true, message: "OTP verified successfully" });
  } else {
    return res.status(400).send({ success: false, message: "Invalid OTP" });
  }
};

const forgetPassword = async (req, res) => {
  const { newPassword, phoneNumber } = req.body;

  // Input validation
  if (!newPassword || !phoneNumber) {
    return res
      .status(400)
      .send({ success: false, message: "Missing required fields" });
  }

  try {
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    const updatedUser = await userModel.findOneAndUpdate(
      { phoneNumber },
      { password: hashedPassword }
    );

    // Check if the user exists and password updated successfully
    if (!updatedUser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    // Send success response
    res
      .status(200)
      .send({ success: true, message: "Your password updated successfully" });
  } catch (error) {
    // Log and send error response
    console.error("Error updating password:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const logoutCtr = async (req, res) => {
  const { userId } = req.body;

  try {
    // Update the user's password
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { expoPushToken: "" }
    );

    // Check if the user exists and password updated successfully
    if (!updatedUser) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    // Send success response
    res.status(200).send({ success: true, message: "Logged out successfully" });
  } catch (error) {
    // Log and send error response
    console.error("Error logged out:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const verify = async (req, res) => {
  const { phoneNumber, oldPhone } = req.body;
  let verify1 = "";
  let verifyNo2 = "";

  const existingUser = await userModel.findOne({ phoneNumber }).exec();

  if (existingUser) {
    return res
      .status(200)
      .send({ message: "User Already Exist", success: false });
  }

  // if (phoneNumber) {
  //   verify1 = await textflow.sendVerificationSMS("+91" + phoneNumber);
  // }
  // if (oldPhone) {
  //   verifyNo2 = await textflow.sendVerificationSMS("+91" + oldPhone);
  // }

  // if (phoneNumber && oldPhone && verify1.ok && verifyNo2.ok) {
  //   return res.status(200).json({ success: true });
  // } else {
  //   if (verify1.ok) {
  //     return res.status(200).json({ success: true });
  //   }
  // }

  return res.status(200).json({ success: true });

  // return res.status(400).json({ success: false, verify1, verifyNo2 });
};

// login callback
const loginController = async (req, res) => {
  const { expoPushToken, phoneNumber } = req.body;
  try {
    const user = await userModel.findOne({ phoneNumber: req.body.phoneNumber });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const result = user;
    result.password = null;

    // Update expoPushToken and save the user
    console.log("expoPushToken", expoPushToken);
    const newUser = await userModel.findOneAndUpdate(
      { phoneNumber },
      { expoPushToken }
    );
    console.log("expoPushToken22", expoPushToken);

    // user.expoPushToken = expoPushToken;
    // await user.save();

    res.status(200).send({
      message: "Login Success",
      success: true,
      token,
      isServiceProvider: user.isServiceProvider,
      isAdmin: user.isAdmin,
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

// forgetPassword callback
const forgetPasswordController = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const user = await userModel.findOne({ phoneNumber: req.body.phoneNumber });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    // const isMatch = await bcrypt.compare(req.body.password, user.password);
    // if (!isMatch) {
    //   return res
    //     .status(200)
    //     .send({ message: "Invalid EMail or Password", success: false });
    // }
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });
    // const result = user;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update expoPushToken and save the user

    const newUser = await userModel.findOneAndUpdate(
      { phoneNumber },
      { password: hashedPassword }
    );
    // user.expoPushToken = expoPushToken;
    // await user.save();

    res.status(200).send({
      message: "Login Success",
      success: true,
      token,
      isServiceProvider: user.isServiceProvider,
      isAdmin: user.isAdmin,
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  const { userId } = req.body;
  const { user_id } = req.query;
  try {
    const query = {};
    if (user_id) {
      query._id = user_id;
    } else {
      query._id = userId;
    }
    const user = await userModel.findById(query);
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// Apply Service Provider CTRL
const applyServiceProviderController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    const userWithoutId = { ...user };
    delete userWithoutId._doc._id;
    // if (user) {
    //   res.status(201).send({
    //     success: true,
    //     userWithoutId: userWithoutId._doc,
    //     message: "ServiceProvider Account Applied SUccessfully",
    //   });
    //   return;
    // }
    const { lat, lng } = userWithoutId._doc.location[0].geometry.location;
    const newServiceProvider = await serviceProviderModel({
      ...req.body,
      ...userWithoutId._doc,
      location: {
        type: "Point",
        coordinates: [lat, lng],
      },
      status: "approved",
    });
    await newServiceProvider.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;

    notification.push({
      type: "newAccountRequests",
      title: "new work provider request",
      message: `${newServiceProvider.name} has applied for work provider account`,
      onClickPath: "/admin/serviceProviders",

      data: {
        serviceProviderId: newServiceProvider._id,
        name: newServiceProvider.name,
      },
    });

    const messages = [
      {
        to: adminUser.expoPushToken,
        sound: "default",
        title: "new work provider request",
        body: `🎉 Exciting News! ${newUser.name} Has Applied For A work provider Account.🚀`,
        // data: { title, body },
      },
    ];

    // Send push notifications using the imported function
    const notificationResponses = await sendNotification(
      "new work provider request",
      `🎉 Exciting News! ${newUser.name} Has Applied For A work provider Account.🚀`,
      adminUser.expoPushToken,
      {
        title: "new work provider request",
        body: `🎉 Exciting News! ${newUser.name} Has Applied For A work provider Account.🚀`,
      }
    );

    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "ServiceProvider Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Service Provider",
    });
  }
};

//notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

//GET ALL ServiceProviders
const getAllServiceProvidersController = async (req, res) => {
  try {
    const serviceProviders = await serviceProviderModel.find({
      status: "approved",
    });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: serviceProviders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro WHile Fetching DOcotr",
    });
  }
};

//BOOK APPOINTMENT
const bookAppointmentController = async (req, res) => {
  const {
    date,
    timeSlot,
    userId,
    serviceProviderId,
    serviceProviderInfo,
    userInfo,
  } = req.body;

  // Uncomment if needed
  // updateTimeSlots(req, res);

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

    // Choose either findOneAndUpdate or direct manipulation based on your requirements
    // Example using findOneAndUpdate (uncomment if needed):
    /*
    await serviceProviderModel.findOneAndUpdate(
      {
        _id: serviceProviderId,
        [`timeSlots.${date}.timeSlot`]: timeSlot,
      },
      {
        $set: {
          [`timeSlots.${date}.$[slot].status`]: "booked",
        },
      },
      {
        arrayFilters: [{ "slot.timeSlot": timeSlot }],
        new: true,
      }
    );
    */

    // Example using direct manipulation (comment out if not needed):

    const serviceProvider = await serviceProviderModel.findById(
      serviceProviderId
    );

    if (!serviceProvider) {
      return res.status(404).send({
        success: false,
        message: "Service Provider not found.",
      });
    }

    const slotToUpdate = serviceProvider.timeSlots[date];

    if (!slotToUpdate) {
      serviceProvider.timeSlots[date] = [
        { timeSlot: timeSlot, status: "booked" },
      ];
    } else {
      const existingSlotIndex = slotToUpdate.findIndex(
        (slot) => slot.timeSlot === timeSlot
      );

      if (existingSlotIndex === -1) {
        slotToUpdate.push({ timeSlot: timeSlot, status: "booked" });
      } else {
        return res.status(400).send({
          success: false,
          message: "Time slot is already booked for the selected date.",
        });
      }
    }

    // Save the updated service provider information
    await serviceProviderModel.updateOne(
      { _id: serviceProviderId },
      { $set: { timeSlots: serviceProvider.timeSlots } }
    );

    const newAppointment = new bookingModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({
      _id: req.body.serviceProviderInfo.userId,
    });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/bookings",
    });
    await user.save();

    res.status(200).send({
      success: true,
      message: "Appointment booked successfully",
      serviceProvider,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking appointment",
    });
  }
};

const bookAppointmentController11 = async (req, res) => {
  const {
    date,
    timeSlot,
    userId,
    serviceProviderId,
    serviceProviderInfo,
    userInfo,
    maxDistance,
    category,
    subcategories,
  } = req.body;

  // Uncomment if needed
  // updateTimeSlots(req, res);

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

    let serviceProviders = [];

    const currentUser = await userModel.findOne({
      _id: userId,
    });

    const newAppointment = await bookingModel.create(req.body);
    await newAppointment.save();

    if (!serviceProviderId) {
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

      const aggregationPipeline = [
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: currentUser.location.coordinates,
            },
            distanceField: "distance",
            maxDistance: maxDistance || 12000,
            spherical: true,
          },
        },
        {
          $match: {
            status: "approved",
            category: splitCamelCase(category).toLowerCase(),
            subcategories: {
              $in: subcategories.map((subcategory) =>
                splitCamelCase(subcategory).toLowerCase()
              ),
            },
          },
        },
      ];

      serviceProviders = await serviceProviderModel.aggregate(
        aggregationPipeline
      );
    } else {
      serviceProviders = await serviceProviderModel.find({
        _id: serviceProviderId,
      });
    }

    if (serviceProviders.length <= 0) {
      return res.status(404).send({
        success: false,
        message: "Service Provider not found.",
      });
    }

    for (let serviceProvider of serviceProviders) {
      // const slotToUpdate = serviceProvider.timeSlots[date];

      const newUser = await userModel.findOne({
        _id: serviceProvider.userId,
      });

      // Prepare the push notifications
      // const messages = newUser.map(({ expoPushToken }) => ({
      //   to: expoPushToken,
      //   sound: "default",
      //   title: "new service booking request",
      //   body: "🎉 Exciting News! You've just received a new service booking request. Check it out now and provide your exceptional service. 🚀",
      //   // data: { title, body },
      // }));

      const sendNotiFun = async () => {
        // Send push notifications using the imported function
        const notificationResponses = await sendNotification(
          "new service booking request",
          "🎉 Exciting News! You've just received a new service booking request. Check it out now and provide your exceptional service. 🚀",
          newUser.expoPushToken,
          {
            title: "new service booking request",
            body: "🎉 Exciting News! You've just received a new service booking request. Check it out now and provide your exceptional service. 🚀",
          }
        );

        const newServiceProvider = await userModel.findOne({
          _id: serviceProvider.userId,
        });
        newServiceProvider.notification.push({
          type: "serviceBooking",
          title: "New-service-booking-request",
          message: `A new service booking request from ${currentUser.name}`,
          data: newAppointment,
          onCLickPath: "/user/bookings",
        });
        await newServiceProvider.save();
      };

      console.log("slotToUpdate");

      const slotToUpdate = serviceProvider?.timeSlots?.[date];
      console.log("slotToUpdate", slotToUpdate);

      if (!slotToUpdate) {
        sendNotiFun();
      } else {
        const existingSlotIndex = slotToUpdate.findIndex(
          (slot) => slot.timeSlot === timeSlot
        );

        if (existingSlotIndex === -1) {
          // slotToUpdate.push({ timeSlot: timeSlot, status: "booked" });
          sendNotiFun();
        }
      }
    }

    res.status(200).send({
      success: true,
      message: "Requests sent successfully",
      serviceProviders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking appointment",
    });
  }
};

//update timeSlots

const updateTimeSlots = async (req, res) => {
  const { serviceProviderId, date, time } = req.body;

  try {
    const currentDate = moment();
    const nextDate = moment().add(30, "days");
    const formattedNextDate = nextDate.format("YYYY-MM-DD");

    const updatedServiceProvider = await serviceProviderModel.findOneAndUpdate(
      { _id: serviceProviderId },
      {
        $pull: {
          timeSlots: {
            $elemMatch: {
              timeSlot: {
                $lt: new Date(), // Remove time slots with dates in the past
              },
            },
          },
        },
        $push: {
          ["timeSlots." + formattedNextDate]: {
            $each: [
              {
                timeSlot: "10:00 AM",
                status: "available",
              },
              {
                timeSlot: "11:00 AM",
                status: "available",
              },
              // Add more time slots as needed
            ],
            $sort: { timeSlot: 1 },
          },
        },
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "TimeSlots updated",
      updatedServiceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In update",
    });
  }
};

// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
  const { serviceProviderId } = req.body;
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const serviceProviderId = req.body.serviceProviderId;
    const updatedServiceProvider =
      await serviceProviderModel.findOneAndUpdate();

    const bookings = await bookingModel.find({
      serviceProviderId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (bookings.length > 0) {
      return res.status(200).send({
        message: "Appointments not Available at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};

const getBookings = async (req, res) => {
  const { userId } = req.body;

  const user = await userModel.findById({ _id: req.body.userId });

  try {
    const query = {};

    if (user.isServiceProvider) {
      const serviceProvider = await serviceProviderModel.findOne({
        userId: userId,
      });
      query.$or = [
        { serviceProviderId: serviceProvider._id },
        { userId: userId },
      ];
    } else if (userId) {
      query.userId = userId;
    }

    const pendingBookings = await bookingModel
      .find({
        ...query,
        status: "pending",
      })
      .sort({ date: 1 });

    const completedBookings = await bookingModel
      .find({
        ...query,
        status: "completed",
      })
      .sort({ date: 1 });

    const rejectedBookings = await bookingModel
      .find({
        ...query,
        status: "rejected",
      })
      .sort({ date: 1 });

    const acceptedBookings = await bookingModel
      .find({
        ...query,
        status: "accepted",
      })
      .sort({ date: 1 });

    const allBookings = {
      pending: pendingBookings,
      completed: completedBookings,
      rejected: rejectedBookings,
      accepted: acceptedBookings,
    };

    // const bookings = await bookingModel.find({
    //   $and: [
    //     {
    //       $or: [
    //         { userId: userIdOrServiceProviderId },
    //         { serviceProviderId: userIdOrServiceProviderId },
    //       ],
    //     },
    //     { status: status },
    //     // { 'date': req.body.date }, // Assuming date is also passed in the request body
    //   ],
    // });

    return res.status(200).send({
      success: true,
      allBookings: allBookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "An error occurred while fetching bookings.",
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const bookings = await bookingModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

const getLocalAreasServiceProviders = async (req, res) => {
  const { category, subcategories, maxDistance, searchStr } = req.body;

  try {
    const userData = await userModel.findOne({ _id: req.body.userId });

    const { location: userLocation } = userData;

    const minDistance = 500;
    const query = {
      status: "approved",
    };

    console.log("userData", userData.isServiceProvider);
    if (!userData.isServiceProvider) {
      await serviceProviderModel.collection.createIndex(
        { location: "2dsphere" },
        (err, result) => {
          if (err) {
            console.error("Error creating index for serviceProviders:", err);
          } else {
            console.log(
              "Index created successfully for serviceProviders:",
              result
            );
          }
        }
      );
    } else {
      query.isServiceProvider = false;
      query.isAdmin = false;
      await userModel.collection.createIndex(
        { location: "2dsphere" },
        (err, result) => {
          if (err) {
            console.error("Error creating index for users:", err);
          } else {
            console.log("Index created successfully for users:", result);
          }
        }
      );
    }
    if (searchStr) {
      var searchStrLower = req.body.searchStr.toLowerCase();
      query["$or"] = [
        { category: { $regex: searchStrLower, $options: "i" } }, // Case-insensitive match for category
        { subcategories: { $elemMatch: { $eq: searchStrLower } } },
      ];
    } else {
      if (category) {
        query.category = splitCamelCase(category).toLowerCase();
      }

      if (subcategories && subcategories.length > 0) {
        query.subcategories = {
          $in: subcategories.map((subcategory) =>
            splitCamelCase(subcategory).toLowerCase()
          ),
        };
      }
    }

    const aggregationPipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: userLocation.coordinates,
          },
          distanceField: "distance",
          maxDistance: Number(maxDistance) || 12000,
          spherical: true,
        },
      },
      {
        $match: query,
      },
    ];

    let workers = [];
    let serviceProviders = [];

    if (!userData.isServiceProvider) {
      serviceProviders = await serviceProviderModel.aggregate(
        aggregationPipeline
      );
    } else {
      workers = await userModel.aggregate(aggregationPipeline);
    }

    res.status(200).send({
      success: true,
      message: "Service Providers Fetch Successfully",
      data: serviceProviders.length > 0 ? serviceProviders : workers,
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

const addReviewController = async (req, res) => {
  const {
    date,
    timeSlot,
    userId,
    serviceProviderId,
    serviceProviderInfo,
    userInfo,
  } = req.body;

  updateTimeSlots(req, res);

  try {
    const newDate = moment(req.body.date, "YYYY-MM-DD").toISOString();
    // req.body.time = moment(req.body.time, "HH:mm").toISOString();
    // req.body.time = newDate;
    // req.body.date = "pending";
    req.body.time = timeSlot;
    const newAppointment = new bookingModel(req.body);
    await newAppointment.save();

    const updatedServiceProvider = await serviceProviderModel.findOneAndUpdate(
      {
        _id: serviceProviderId,
        [`timeSlots.${date}.timeSlot`]: timeSlot,
      },
      {
        $set: {
          [`timeSlots.${date}.$[slot].status`]: "booked", // Set the desired status, e.g., 'booked'
        },
      },
      {
        arrayFilters: [{ "slot.timeSlot": timeSlot }],
        new: true,
      }
    );

    const user = await userModel.findOne({
      _id: req.body.serviceProviderInfo.userId,
    });

    user.notification.push({
      type: "New-appointment-request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/bookings",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book successfully",
      updatedServiceProvider,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

const updateProfile = async (req, res) => {
  const { userId, name, email, phoneNumber } = req.body;

  try {
    const { profilePhoto: profilePhotoArr, aadharPhoto: aadharPhotoArr } =
      req.files;

    let profileImg = "";
    let aadharImg = "";

    if (profilePhotoArr?.length) {
      profileImg = profilePhotoArr[0].originalname.split(" ").join("_");
    }

    if (aadharPhotoArr?.length) {
      aadharImg = aadharPhotoArr[0].originalname.split(" ").join("_");
    }

    const profilePhotoUrl = profileImg
      ? process.env.BACKEND_URL + "/static/" + profileImg
      : "";
    const aadharPhotoUrl = aadharImg
      ? process.env.BACKEND_URL + "/static/" + aadharImg
      : "";

    console.log(
      "pppppppprofileww",
      profilePhotoArr,
      aadharPhotoArr,
      profilePhotoUrl,
      aadharPhotoUrl
    );
    // Find the user by ID and update profileUrl and aadharUrl

    const updateObj = {};

    if (profilePhotoUrl) {
      updateObj.profilePhotoUrl = profilePhotoUrl;
    }
    if (aadharPhotoUrl) {
      updateObj.aadharPhotoUrl = aadharPhotoUrl;
    }

    if (name) {
      updateObj.name = name;
    }
    if (email) {
      updateObj.email = email;
    }

    if (phoneNumber) {
      var result1 = await textflow.verifyCode("+91" + phoneNumber, otp);
      var result2 = await textflow.verifyCode("+91" + phoneNumber, otp);

      if (!result1.valid || !result2.valid) {
        return res.status(400).json({ success: false, result });
      }

      updateObj.phoneNumber = phoneNumber;
    }

    const filter = { _id: userId };
    const update = {
      $set: updateObj,
    };

    const options = { new: true };

    const updatedUser = await userModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    if (updatedUser.isServiceProvider) {
      const serviceProvider = await serviceProviderModel.findOneAndUpdate(
        { userId: userId },
        update,
        options
      );
    }

    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "profile updated successfully",
        user: updatedUser,
      });
    } else {
      // No document matched the filter
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = {
  loginController,
  registerController,
  verify,
  authController,
  applyServiceProviderController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllServiceProvidersController,
  bookAppointmentController: bookAppointmentController11,
  bookingAvailabilityController,
  userAppointmentsController,
  getLocalAreasServiceProviders,
  uploadImageController,
  getBookings,
  updateProfile,
  sendOtp,
  verifyOtp,
  forgetPassword,
  logoutCtr,
};
