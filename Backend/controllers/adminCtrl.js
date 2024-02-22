const adminRequestsModel = require("../models/adminRequestsModel");
const serviceProviderModel = require("../models/serviceProviderModel");
const userModel = require("../models/userModels");
const { sendNotification } = require("../utils");
const { ObjectId } = require("mongoose").Types;

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllServiceProvidersController = async (req, res) => {
  try {
    const serviceProviders = await serviceProviderModel.find({});
    res.status(200).send({
      success: true,
      message: "ServiceProviders Data list",
      data: serviceProviders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting serviceProviders data",
      error,
    });
  }
};

// serviceProvider account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { userIds, status } = req.body;
    let serviceProvider;

    for (const userId of userIds) {
      try {
        const user = await userModel.findOneAndUpdate(
          { _id: userId },
          { status }
        );

        if (!user) {
          return res.status(404).send({
            success: false,
            message: `User with userId ${userId} not found`,
          });
        }

        const notification = user.notification;

        notification.push({
          type: "accountVerification",
          title: "Account verification",
          message: `Your account request has ${status} by admin.`,
          onClickPath: "/notification",
        });

        // user.isServiceProvider = status === "approved";
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
        console.log("user", user, user.expoPushToken);
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

        if (user.isServiceProvider) {
          serviceProvider = await serviceProviderModel.findOneAndUpdate(
            { userId },
            { status }
          );

          if (!serviceProvider) {
            return res.status(404).send({
              success: false,
              message: `ServiceProvider with userId ${userId} not found`,
            });
          }
        }

        await adminRequestsModel.updateMany(
          { userId: new ObjectId(userId) },
          { $set: { status: status } }
        );

        // await userModel.findOneAndUpdate(
        //   {
        //     isAdmin: true,
        //     "notification.data.userId": new ObjectId(userId),
        //   },
        //   { $set: { "notification.$.data.status": status } }
        // );
      } catch (error) {
        console.error("Error updating user or serviceProvider:", error);
        return res.status(500).send({
          success: false,
          message: "Error in updating user or serviceProvider",
          error,
        });
      }
    }

    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: serviceProvider,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error,
    });
  }
};

const getRequests = async (req, res) => {
  try {
    const { adminId, count } = req.body;

    let query = {
      adminId: adminId,
    };

    // if (count) {
    const pipeline = [
      { $match: query },
      {
        $group: {
          _id: null,
          all: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          rejected: {
            $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] },
          },
          approved: {
            $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] },
          },
        },
      },
    ];

    const requestsCounts = await adminRequestsModel.aggregate(pipeline);
    const requests = await adminRequestsModel.find();

    res.status(200).json({
      success: true,
      data: { requestsCounts, requests },
    });
    // }

    // else {
    //   const requests = await adminRequestsModel.find();

    //   res.status(200).json({
    //     success: true,
    //     data: requests,
    //   });
    // }
  } catch (error) {
    console.error("Error in getRequests:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllServiceProvidersController,
  getAllUsersController,
  changeAccountStatusController,
  getRequests,
};
