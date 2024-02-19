import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Badge } from "react-native-elements";

const { height, width } = Dimensions.get("window");
const Header = ({
  title,
  leftIcon,
  rightIcon,
  rightIcon2,
  onClickRightIcon2,
  onclickLeftIcon,
  onclickRightIcon,
  rightText,
  onclickRightText,
  notificationIcon,
  data,
}) => {
  return (
    <View style={styles.Header}>
      <TouchableOpacity style={styles.btn} onPress={onclickLeftIcon}>
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightCorner}>
        {rightIcon && (
          <TouchableOpacity style={styles.btn} onPress={onclickRightIcon}>
            <Image
              source={rightIcon}
              style={[styles.icon, { width: 25, height: 25 }]}
            />
          </TouchableOpacity>
        )}
        {notificationIcon && (
          <TouchableOpacity onPress={onclickRightIcon}>
            <Avatar rounded source={notificationIcon} size="small" />
            {data?.notification?.length > 0 && (
              <Badge
                status="warning"
                value={data?.notification?.length || 0}
                containerStyle={{ position: "absolute", top: -0, right: -5 }}
              />
            )}
          </TouchableOpacity>
        )}
        {rightText && (
          <TouchableOpacity style={styles.btn} onPress={onclickRightText}>
            <Text style={styles.title}>{rightText}</Text>
          </TouchableOpacity>
        )}

        {rightIcon2 && (
          <TouchableOpacity style={styles.btn} onPress={onClickRightIcon2}>
            <Image
              source={rightIcon2}
              style={[styles.icon, { width: 25, height: 25 }]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  Header: {
    width: width,
    height: 70,
    backgroundColor: "#0786DAFD",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 16,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  rightCorner: {
    flexDirection: "row",
    gap: 5,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: "#fff",
  },
  title: {
    color: "white",
    fontSize: 20,
  },
});
