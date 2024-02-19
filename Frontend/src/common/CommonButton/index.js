import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const CommonBtn = ({ title, handleClick, bgColor }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => handleClick(title)}
      >
        <View
          style={[
            styles.buttonBackground,
            {
              backgroundColor: bgColor,
            },
          ]}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 50,
  },
  buttonBackground: {
    flex: 1,
    borderRadius: 25,
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

export default CommonBtn;
