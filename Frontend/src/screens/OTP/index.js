import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Input, Text } from "react-native-elements";
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { registerApiCall, verifyMobileApiCall } from "../Register/logic";
import { serviceProviders } from "../../dummy";
import Header from "../../common/Header";
import { apiFailureAction } from "../../commonApiLogic.Js";
import { axios } from "axios";
import apiClient from "../../utils";
import { showToast } from "../../common/toast";
import { forgetPasswordApiCall } from "../ForgotPassword/logic";
import { sendOtpApiCall, verifyOtpApiCall } from "./logic";
import Loader from "../../common/Loader";
const inputs = Array(4).fill("");
let newInputIndex = 0;

const isObjValid = (obj) => {
  return Object.values(obj).every((val) => val.trim());
};

async function loadFonts() {
  await Font.loadAsync({
    Poppins: require("../../../fonts/Poppins-Regular.ttf"),
  });
}

const OTP = () => {
  // const { loading: verifyLoading } = useSelector(
  //   (state) => state.verifyOtpData
  // );

  // const { loading: registerLoading } = useSelector(
  //   (state) => state.registerData
  // );

  const inputRef = useRef();
  const route = useRoute();
  const { userData, forgetPasswordData, setLoginState } = route.params;

  const {
    name = "",
    email = "",
    password = "",
    phoneNumber = "",
    category = "",
    subcategories = [],
    address = "",
    userType = "",
    expoPushToken = "",
  } = userData || {};

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [OTP, setOTP] = useState({ 0: "", 1: "", 2: "", 3: "" });
  const [nextInputIndex, setNextInputIndex] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleChangeText = (text, idx) => {
    const newOTP = { ...OTP };
    newOTP[idx] = text;
    setOTP(newOTP);

    const lastInputIndex = inputs.length - 1;

    if (!text) {
      newInputIndex = idx === 0 ? 0 : idx - 1;
    } else {
      newInputIndex = idx === lastInputIndex ? lastInputIndex : idx + 1;
    }
    setNextInputIndex(newInputIndex);
  };

  const submitOTP = () => {
    Keyboard.dismiss();
    if (isObjValid(OTP)) {
      let val = "";
      Object.values(OTP).forEach((v) => {
        val += v;
      });
      handleVerifyOtp(val);
    }
  };

  const handleForgetPassword = () => {
    dispatch(
      forgetPasswordApiCall({
        phoneNumber: forgetPasswordData.phoneNumber,
        newPassword,
      })
    )
      .then((response) => {
        if (response.payload.data.success) {
          navigation.navigate("Login", { setLoginState });
        } else {
          showToast(
            "success",
            response.payload.data.message,
            response.payload.data.message
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("registerErr", error);
        dispatch(apiFailureAction.apiFailure(error));
        setLoading(false);
      });
  };

  const handleVerifyOtp = (val) => {
    const data = userData ? userData : forgetPasswordData;
    setLoading(true);
    dispatch(
      verifyOtpApiCall({
        phoneNumber: data.phoneNumber,
        otp: val,
      })
    )
      .then((response) => {
        if (response.payload.data.success) {
          userData ? handleRegister(val) : handleForgetPassword();
          // navigation.navigate("Login");
        } else {
          showToast(
            "success",
            response.payload.data.message,
            response.payload.data.message
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        dispatch(apiFailureAction.apiFailure(error));
        setLoading(false);
      });
  };

  const handleRegister = async (otp) => {
    const formData = new FormData();

    const isServiceProvider = userType === "serviceProvider";

    if (subcategories.length > 0) {
      subcategories.forEach((value, index) => {
        formData.append(`subcategories[${index}]`, value);
      });
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("category", category);

    formData.append("isServiceProvider", isServiceProvider);
    formData.append("address", address);
    formData.append("expoPushToken", expoPushToken);
    formData.append("otp", otp);

    dispatch(registerApiCall(formData))
      .then((response) => {
        if (response.payload.data.success) {
          navigation.navigate("Login", { setLoginState });
        } else {
          showToast(
            "success",
            response.payload.data.message,
            response.payload.data.message
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("registerErr", error);
        dispatch(apiFailureAction.apiFailure(error));
        setLoading(false);
      });
  };

  const resendOtp = () => {
    const data = {
      phoneNumber: userData
        ? userData.phoneNumber
        : forgetPasswordData.phoneNumber,
    };
    dispatch(sendOtpApiCall(data))
      .unwrap()
      .then((response) => {
        if (response.data.success) {
          console.log("resendOTP", response.data);
        }
      })
      .catch((error) => {
        console.error("Resend otp error:", error);
        dispatch(apiFailureAction.apiFailure(error));
      });

    setSeconds(30);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [nextInputIndex]);

  useEffect(() => {
    loadFonts();

    const updateCountdown = () => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    };

    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    // <View style={{ flex: 1, padding: 20, backgroundColor: "#263E57" }}>
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.otpText}>
          We have sent you an SMS with a code to the number{" "}
        </Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={styles.headingText}>{phoneNumber}</Text>
      </View>

      <KeyboardAvoidingView>
        <View style={styles.otpContainer}>
          {inputs.map((inp, idx) => {
            return (
              <View key={idx} style={styles.inputContainer}>
                <TextInput
                  value={OTP[idx]}
                  onChangeText={(text) => handleChangeText(text, idx)}
                  placeholder="0"
                  style={styles.input}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={nextInputIndex === idx ? inputRef : null}
                />
              </View>
            );
          })}
        </View>
        {forgetPasswordData && (
          <View>
            <Input
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
              placeholder="Enter New Password *"
              inputContainerStyle={{ borderBottomWidth: 0 }}
              secureTextEntry
              style={styles.inputPass}
            />

            <Input
              onChangeText={(text) => setConfirmNewPassword(text)}
              value={confirmNewPassword}
              placeholder="Confirm New Password *"
              secureTextEntry
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={styles.inputPass}
            />
          </View>
        )}
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.buttonContainer} onPress={submitOTP}>
        <View style={styles.buttonBackground}>
          <Text style={styles.buttonText}>
            {forgetPasswordData ? "Update Password" : "Verify"}
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={resendOtp} disabled={seconds >= 0}>
          <Text style={{ ...styles.resendText, ...styles.resendLink }}>
            Resend a new code
          </Text>
        </TouchableOpacity>
        <Text style={styles.resendText}>
          Available in {seconds >= 0 ? seconds : "0"} seconds
        </Text>
      </View>
    </View>
    // </View>
  );
};

const { width } = Dimensions.get("window");
const inputWidth = Math.round(width / 6);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#263E57",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: inputWidth / 2,
    marginBottom: 47,
    gap: 16,
  },
  inputContainer: {
    width: inputWidth,
    height: inputWidth,
    borderWidth: 2,
    borderColor: "#8469cf",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  input: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  inputPass: {
    backgroundColor: "#415D79",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  otpText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
  },
  headingText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 34,
    fontWeight: 700,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  resendText: {
    fontSize: 16,
    fontWeight: 400,
    opacity: 0.7,
    textAlign: "center",
    color: "#FFF",
  },
  resendLink: {
    opacity: 1,
  },

  buttonContainer: {
    width: 343,
    height: 50,
    marginVertical: 40,
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
export default OTP;
