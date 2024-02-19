import React, { useEffect, useState } from "react";

import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Input, Text } from "react-native-elements";
import * as Font from "expo-font";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addSession } from "../../utils/sessionManagement";
import { headerUtils } from "../../utils";
import { apiFailureAction } from "../../commonApiLogic";
import { forgetPasswordApiCall } from "./logic";
import { verifyMobileApiCall } from "../Register/logic";
import { sendOtpApiCall } from "../OTP/logic";

async function loadFonts() {
  await Font.loadAsync({
    Poppins: require("../../../fonts/Poppins-Regular.ttf"),
  });
}

const ForgotPassword = () => {
  const route = useRoute();
  const { setLoginState } = route.params;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const isValidPhoneNumber = (number) => {
    return /^[0-9]{10}$/.test(number);
  };

  const updatePassword = () => {
    dispatch(forgetPasswordApiCall({ phoneNumber: phoneNumber }))
      .unwrap()
      .then(({ data }) => {
        addSession(data);
        headerUtils.setHeader(data.token);
        navigation.navigate("Main");
      })
      .catch((error) => {
        const serializableError = {
          message: error.message,
          // You can include other serializable properties if needed
        };
        dispatch(apiFailureAction.apiFailure(serializableError));
      });
  };

  const HandlePasswordRecovery = () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    dispatch(sendOtpApiCall({ phoneNumber }))
      .unwrap()
      .then((response) => {
        if (response.data.success) {
          console.log("otpppp", response.data);
          navigation.navigate("OTP", {
            forgetPasswordData: {
              phoneNumber,
              forgetPassword: true,
            },
            setLoginState,
          });
        }
      })
      .catch((error) => {
        console.error("forgetPassword error:", error);
        dispatch(apiFailureAction.apiFailure(error));
      });
  };

  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.headingText}> {t("Forgot-your-password")}</Text>
        <Text style={styles.subHeading}>
          {t("Enter-your-registered-number")}
        </Text>
      </View>

      {/* <Input
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="numeric"
        value={phoneNumber}
        placeholder="Mobile Number"
        inputContainerStyle={{ borderBottomWidth: 0 }}
        // leftIcon={{ type: "font-awesome", name: "phone" }}
        style={styles.input}
      /> */}

      <Input
        style={styles.input}
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
        placeholder={t("Phone-Number-Placeholder")}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={HandlePasswordRecovery}
      >
        <View style={styles.buttonBackground}>
          <Text style={styles.buttonText}>{t("Password-recovery")}</Text>
        </View>
      </TouchableOpacity>
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
    fontSize: 27,
    fontWeight: 700,
  },
  subHeading: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    opacity: 0.7,
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
    fontWeight: "400",
    color: "#FFF",
  },
});
export default ForgotPassword;
