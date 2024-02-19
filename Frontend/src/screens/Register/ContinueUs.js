import React, { useEffect, useState } from "react";

import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Input, Text } from "react-native-elements";
import * as Font from "expo-font";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginApiCall } from "./logic";
import { apiFailureAction } from "../../commonApiLogic";
import { addSession, checkIfLogin } from "../../utils/sessionManagement";
import { headerUtils } from "../../utils";
const { width, height } = Dimensions.get("window");

const ContinueUs = ({}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const navigation = useNavigation();
  const [userType, setUserType] = useState("");

  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.headingText}> {t("Continue-as")}</Text>
      </View>
      <View style={{ gap: 24 }}>
        <TouchableOpacity
          onPress={() => {
            setUserType("user");
            navigation.navigate("Register", { userType: "user" });
          }}
          style={styles.card}
        >
          <Text style={styles.cardText}>{t("Worker")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setUserType("serviceProvider");
            navigation.navigate("Register", { userType: "serviceProvider" });
          }}
          style={styles.card}
        >
          <Text style={styles.cardText}>{t("Work-Provider")}</Text>
        </TouchableOpacity>
      </View>

      {/* <View>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text
            style={{
              ...styles.signUpText,
              textAlign: "right",
              width: width,
              marginBottom: 20,
              padding: 10,
              paddingHorizontal: 40,
            }}
          >
            Forgot userType
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* <TouchableOpacity style={styles.buttonContainer} onPress={handleUser}>
        <View style={styles.buttonBackground}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </View>
      </TouchableOpacity> */}

      {/* <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.signUpText}>Not yet a member? </Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={{ ...styles.signUpText, ...styles.signUpLink }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View> */}
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
  card: {
    backgroundColor: "#415D79",
    color: "white",
    padding: 10,
    borderRadius: 5,
    width: 300,
  },
  cardText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
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
export default ContinueUs;
