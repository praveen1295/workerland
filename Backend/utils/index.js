const moment = require("moment");
const { Expo } = require("expo-server-sdk");
const admin = require("firebase-admin");
const serviceAccount = require("../csrs-920d0-firebase-adminsdk-kebbd-29ee396698.json"); // Path to your service account key JSON file

function generateDateObject(startDate, numberOfDays, timeSlots) {
  const dateObject = {};

  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = moment(startDate).add(i, "days").format("YYYY-MM-DD");
    const timeSlotsWithStatus = generateTimeSlotsWithStatus(timeSlots); // Modified function to include status

    dateObject[currentDate] = timeSlotsWithStatus;
  }

  return dateObject;
}

// Function to generate example time slots
function generateTimeSlotsWithStatus(timeSlots) {
  const timeSlotsWithStatus = timeSlots.map((timeSlot) => ({
    timeSlot,
    status: "available",
  }));

  return timeSlotsWithStatus;
}

// notificationService.js

console.log(
  "process.env.EXPO_ACCESS_TOKEN",
  process.env.EXPO_ACCESS_TOKEN,
  process.env.PORT
);

// const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
const expo = new Expo();

// const sendNotification = async (title, body, messages) => {
//   const chunks = expo.chunkPushNotifications(messages);
//   const tickets = [];
//   for (const chunk of chunks) {
//     try {
//       if (chunk) {
//         const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//         tickets.push(...ticketChunk);
//       }
//     } catch (error) {
//       console.error("Error sending push notification:", error.message);
//     }
//   }

//   const responses = [];

//   for (const ticket of tickets) {
//     if (ticket.status === "error") {
//       if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
//         responses.push({ status: "error", error: "DeviceNotRegistered" });
//       }
//     }

//     if (ticket.status === "ok") {
//       responses.push({ status: "ok", id: ticket.id });
//     }
//   }

//   return responses;
// };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add your databaseURL if necessary
  // databaseURL: "YOUR_DATABASE_URL"
});

// Function to send a notification
const sendNotification = async (title, body, token, data) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: data,
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

module.exports = {
  generateDateObject,
  generateTimeSlotsWithStatus,
  sendNotification,
};
