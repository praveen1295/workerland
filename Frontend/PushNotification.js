// PushNotification.js

import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export const usePushNotifications = () => {
  useEffect(() => {
    registerForPushNotifications();

    // Handle incoming notifications
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // Handle the incoming notification
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const registerForPushNotifications = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.error("Failed to get push token for push notification!");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    // Send the token to your server for storing
    // You can use an API call to your Node.js server here
  };
};
