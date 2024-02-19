import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { Input, Button, Image } from "react-native-elements";
import Header from "../../common/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import apiClient from "../../utils";
import { useDispatch } from "react-redux";
import { verifyMobileApiCall } from "../Register/logic";
import { apiFailureAction } from "../../commonApiLogic";
import Loading from "../Loading";

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { userData, getUserData } = route.params;
  const [name, setName] = useState(userData?.name);
  const [phoneNumber, setMobileNumber] = useState(userData.phoneNumber);
  const [email, setEmail] = useState(userData?.email);
  const [profileImage, setProfileImage] = useState(userData?.profilePhotoUrl);
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);

    formData.append("profilePhoto", {
      name: Date.now() + "_profile.jpg",
      uri: profileImage,
      type: "image/jpg",
    });
    submitData(formData);
  };

  const isValidPhoneNumber = (number) => {
    return /^[0-9]{10}$/.test(number);
  };

  const updateMobileNumber = () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Please enter valid phone number");
      return;
    }
    if (userData.phoneNumber === phoneNumber) {
      return;
    }

    dispatch(
      verifyMobileApiCall({ phoneNumber, oldPhone: userData?.phoneNumber })
    )
      .unwrap()
      .then((response) => {
        if (response.data.success) {
          const formData = new FormData();
          formData.append("phoneNumber", phoneNumber);
          submitData(formData);

          // navigation.navigate("OTP", { userData });
        }
      })
      .catch((error) => {
        console.error("Verification error:", error);
        dispatch(apiFailureAction.apiFailure(error));
      });
  };

  const submitData = async (formData) => {
    try {
      setLoading(true);
      const res = await apiClient.post("user/updateProfile", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("Images uploaded successfully.");
        // navigation.goBack();
        // navigation.navigate("Main");
        // navigation.goBack();
        getUserData();
        setLoading(false);

        // props.navigation.dispatch(StackActions.replace("UserProfile"));
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const handleImagePick = async () => {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#0786DAFD" barStyle="light-content" />
      <Header
        leftIcon={require("../../images/backBtn.png")}
        title={"Edit Your Profile"}
        onclickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imageWrapper}
            onPress={handleImagePick}
          >
            <Image
              source={{
                uri: profileImage || "https://via.placeholder.com/150",
              }}
              style={styles.profileImage}
            />
            <FontAwesome
              name="pencil"
              size={24}
              color="white"
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={{ width: 90 }} onPress={handleSaveProfile}>
            <Text
              style={{
                color: "blue",
                paddingVertical: 10,
                textAlign: "center",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: 250,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Input
            label="Mobile Number"
            placeholder="Enter your mobile number"
            value={phoneNumber}
            onChangeText={(text) => setMobileNumber(text)}
            inputContainerStyle={{ width: "80%" }}
          />
          <TouchableOpacity onPress={updateMobileNumber}>
            <Text
              style={{
                color: "blue",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "blue", // Add a background color or adjust as needed
    padding: 5,
    borderRadius: 12,
  },
});

export default EditProfile;
