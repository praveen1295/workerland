import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Home";
import Login from "../Login";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../utils/service";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Drawer = createDrawerNavigator();

const Main = () => {
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);

  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const {
          notification: {
            request: {
              content: {
                data: { screen },
              },
            },
          },
        } = response;

        if (screen) {
          navigation.navigate(screen); // Corrected navigation here
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  console.log("notification", notification, expoPushToken);

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default Main;
