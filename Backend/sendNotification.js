const admin = require("firebase-admin");
const serviceAccount = require("./csrs-920d0-firebase-adminsdk-kebbd-29ee396698.json"); // Path to your service account key JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add your databaseURL if necessary
  // databaseURL: "YOUR_DATABASE_URL"
});

// Function to send a notification
async function sendNotification(token, title, body, data) {
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
}
