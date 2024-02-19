import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

import { useTranslation } from "react-i18next";
import i18next, { languageResources } from "../../utils/services/i18next";
import languagesList from "../../utils/services/languagesList.json";

import { Input, Text } from "react-native-elements";
import * as Font from "expo-font";
import Svg, { Path, Text as SvgText } from "react-native-svg";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginApiCall } from "./logic";
import { apiFailureAction } from "../../commonApiLogic";
import { addSession, checkIfLogin } from "../../utils/sessionManagement";
import { headerUtils } from "../../utils";
import Toast from "react-native-toast-message";
import { showToast } from "../../common/toast";

import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../utils/service";
import Loader from "../../common/Loader";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const LoginForm = ({ setLoginState }) => {
  const dispatch = useDispatch();

  const { loading: loginLoading } = useSelector((state) => state.loginData);

  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = React.useState(false);
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const { t } = useTranslation();
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  const handleLogin = () => {
    dispatch(loginApiCall({ phoneNumber: username, password, expoPushToken }))
      .then((response) => {
        console.log("loginResponse", response.payload.data);

        if (response.payload.data.success) {
          addSession(response.payload.data);
          headerUtils.setHeader(response.payload.data.token);
          setLoginState && setLoginState(true);
          navigation.navigate("Main");
        } else {
          showToast(
            "success",
            response.payload.data.message,
            response.payload.data.message
          );
        }
      })
      .catch((error) => {
        console.log("loginError", error);
        dispatch(apiFailureAction.apiFailure(error));
      });
  };

  const handleRegister = () => {
    // Navigate to the register page
    navigation.navigate("ContinueUs");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword", { setLoginState });
  };

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

        console.log("screen", screen);
        if (screen) {
          props.navigation.navigate(screen);
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const { width } = Dimensions.get("window");

  console.log("loginLoading", loginLoading);

  // if (loginLoading) {
  //   return <Loader />;
  // }

  return (
    <View style={styles.container}>
      {loginLoading ? (
        <Loader />
      ) : (
        <>
          <Toast autoHide={true} visibilityTime={2500} />
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.headingText}>{t("Login-to-Your-Account")}</Text>
          </View>
          <Input
            onChangeText={(text) => setUsername(text)}
            value={username}
            keyboardType="numeric"
            placeholder={t("Mobile-Number")}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.input}
          />
          <Input
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder={t("Password")}
            secureTextEntry
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.input}
          />

          <View
            style={{
              width: width,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={{
                width: 180,
                // backgroundColor: "red",
                marginBottom: 20,
                justifyContent: "center",
                alignItems: "center",
                // padding: 10,
              }}
            >
              <Text
                style={{
                  ...styles.signUpText,
                  textAlign: "center",
                }}
              >
                {t("Forgot-password")}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLogin}
          >
            <View style={styles.buttonBackground}>
              <Text style={styles.buttonText}>{t("SIGN-IN")}</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.signUpText}>{t("Not-yet-a-member?")} </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={{ ...styles.signUpText, ...styles.signUpLink }}>
                {t("Sign-up")}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#263E57",
  },
  headingText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 34,
    fontWeight: 700,
  },
  signUpText: {
    fontSize: 16,
    fontWeight: 400,
    opacity: 0.7,
    marginTop: 20,
    textAlign: "center",
    color: "#FFF",
  },
  signUpLink: {
    opacity: 1,
  },
  input: {
    backgroundColor: "#415D79",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: 343,
    height: 50,
  },
  buttonBackground: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    // fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: "#FFF",
  },
});

export default LoginForm;
