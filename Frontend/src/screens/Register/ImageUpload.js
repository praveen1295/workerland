import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import apiClient from "../../utils/apiClient";
import CommonBtn from "../../common/CommonButton";
import Header from "../../common/Header";
import { useTranslation } from "react-i18next";

const ImageUpload = (props) => {
  const route = useRoute();
  const { t } = useTranslation();
  const { localServiceProvider, getUserData, handleSubmit } = route.params;
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState("");
  const [aadhaarImage, setAadhaarImage] = useState("");

  const [progress, setProgress] = useState(0);
  //   const { token } = props.route.params;

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        setProfileImage(response.assets[0].uri);
      }
    }
  };

  const openImageLibrary1 = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        setAadhaarImage(response.assets[0].uri);
      }
    }
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("profilePhoto", {
      name: Date.now() + "_profile.jpg",
      uri: profileImage,
      type: "image/jpg",
    });

    formData.append("aadharPhoto", {
      name: Date.now() + "_aadhar.jpg",
      uri: aadhaarImage,
      type: "image/jpg",
    });

    try {
      const res = await apiClient.post("user/uploadImages", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          //   authorization: `JWT ${token}`,
        },
      });

      if (res.data.success) {
        alert("Images uploaded successfully.");
        // navigation.goBack();
        // navigation.navigate("Main");
        getUserData();
        // navigation.navigate("serviceProviderDetail", {
        //   localServiceProvider,
        // });
        navigation.goBack();

        // props.navigation.dispatch(StackActions.replace("UserProfile"));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../../images/backBtn.png")}
        // rightIcon={require("../../images/notification.svg")}
        title={t("Images-Upload")}
        onclickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <View style={{ backgroundColor: "#415D79", width: width }}>
        <Text style={{ ...styles.heading, padding: 14, color: "#fff" }}>
          {t("DOCUMENTS-MANDATORY-FOR-BOOK-SERVICES")}
        </Text>
      </View>
      <View
        style={{
          height: 500,
          gap: 14,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.uploadBtnContainer}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text style={styles.uploadBtn}>{t("Upload-Profile-Image")}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openImageLibrary1}
          style={styles.aadhaarUploadBtnContainer}
        >
          {aadhaarImage ? (
            <Image
              source={{ uri: aadhaarImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text style={styles.uploadBtn}>{t("Upload-Aadhaar-Image")}</Text>
          )}
        </TouchableOpacity>
      </View>
      {profileImage ? (
        <CommonBtn
          title={t("Upload")}
          handleClick={uploadProfileImage}
          bgColor={"green"}
        />
      ) : // <TouchableOpacity
      //   onPress={uploadProfileImage}
      //   style={[
      //     styles.skip,
      //     { backgroundColor: "green", color: "white", borderRadius: 8 },
      //   ]}
      // >
      //   <Text>Upload</Text>
      // </TouchableOpacity>
      null}
      <CommonBtn
        title={t("Skip")}
        handleClick={handleSubmit}
        bgColor={"green"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
  aadhaarUploadBtnContainer: {
    height: 200,
    width: 300,
    // borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
});

export default ImageUpload;
