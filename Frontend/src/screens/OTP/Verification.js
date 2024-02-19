import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

const inputs = Array(4).fill("");
let newInputIndex = 0;

const isObjValid = (obj) => {
  return Object.values(obj).every((val) => val.trim());
};
const Verification = () => {
  const [OTP, setOTP] = useState({ 0: "", 1: "", 2: "", 3: "" });
  const [nextInputIndex, setNextInputIndex] = useState(0);
  const inputRef = useRef();

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
    }

    // const res = await
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [nextInputIndex]);
  return (
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
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get("window");
const inputWidth = Math.round(width / 6);

const styles = StyleSheet.create({
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
    paddingHorizontal: 15,
    textAlign: "center",
  },
});

export default Verification;
