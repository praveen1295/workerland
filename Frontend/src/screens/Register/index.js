import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import i18next, { languageResources } from "../../utils/services/i18next";
import languagesList from "../../utils/services/languagesList.json";
import { serviceTypeRR } from "../../dummy";
import { Input, Text, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { registerApiCall, verifyMobileApiCall } from "./logic"; // Import your registration API call logic
import * as ImagePicker from "expo-image-picker";
import { Header } from "react-native-elements/dist/header/Header";
import apiClient from "../../utils";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import DropDown from "../../common/DropDown";
import { apiFailureAction } from "../../commonApiLogic.Js";
import { showToast } from "../../common/toast";
import SubcategoryModal from "./SubCategoryModal";

import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../utils/service";
import { sendOtpApiCall } from "../OTP/logic";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

var professionsArray = [
  { label: "Choose (चुनिए)", value: "choose" },
  {
    label: "Agriculture Workers (कृषि कर्मचारी)",
    value: "agricultureWorkers",
  },
  {
    label: "Jewelry Workers(आभूषण श्रमिक)",
    value: "jewelryWorkers",
  },
  {
    label: "Auto Mechanics (ऑटो मैकेनिक)",
    value: "autoMechanics",
  },
  {
    label: "Auto Part Industry Workers (ऑटो पार्ट उद्योग के कार्यकर्ता)",
    value: "autoPartIndustryWorkers",
  },
  {
    label: "Bank And Finance Consultants (बैंक और वित्त सलाहकार)",
    value: "bankAndFinanceConsultants",
  },
  {
    label: "Computer And Mobile (कंप्यूटर और मोबाइल)",
    value: "computerAndMobile",
  },
  {
    label: "Construction Workers (निर्माण कर्मचारी)",
    value: "constructionWorkers",
  },
  {
    label:
      "Court And Registrar Office Consultants (कोर्ट और रजिस्ट्रार कार्यालय सलाहकार)",
    value: "courtAndRegistrarOfficeConsultants",
  },
  { label: "Drivers (ड्राइवर्स)", value: "Drivers" },
  {
    label: "Education Consultants (शिक्षा सलाहकार)",
    value: "educationConsultants",
  },
  { label: "Footwear (जूते)", value: "Footwear" },
  {
    label: "Hosiery Worker (होज़री कार्मिक)",
    value: "hosieryWorker",
  },
  {
    label: "Hotel And Food Industry (होटल और खाद्य उद्योग)",
    value: "hotelAndFoodIndustry",
  },
  { label: "Home Servants (घर के सेवक)", value: "homeServants" },
  {
    label: "Industrial Machinery Operators (औद्योगिक मशीनरी ऑपरेटर्स)",
    value: "industrialMachineryOperators",
  },
  {
    label: "Medical Professionals (चिकित्सा पेशेवर)",
    value: "medicalProfessionals",
  },
  {
    label: "Pet Care (पालतू जानवरों की देखभाल)",
    value: "petCare",
  },
  { label: "Real Estate (रियल एस्टेट)", value: "realEstate" },
  {
    label: "Sales And Delivery Persons (बिक्री और वितरण व्यक्तियों)",
    value: "salesAndDeliveryPersons",
  },
  {
    label:
      "Salon And Beauty Parlor Service Providers (सैलून और ब्यूटी पार्लर सेवा प्रदाता)",
    value: "salonAndBeautyParlorServiceProviders",
  },
  {
    label: "Security Service Providers (सुरक्षा सेवा प्रदाता)",
    value: "securityServiceProviders",
  },
  { label: "Astrologers (ज्योतिषी)", value: "Astrologers" },
  {
    label: "Office Staff (कार्यालय के कर्मचारी)",
    value: "officeStaff",
  },
  {
    label: "Field Staff (क्षेत्र कर्मचारी)",
    value: "fieldStaff",
  },
  {
    label: "Field worker (क्षेत्र कार्यकर्ता)",
    value: "fieldWorker",
  },
];

const categories = ["Work Provider", "Worker"];
const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { userType } = route.params;
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [aadharPhoto, setAadharPhoto] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(false);

  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);

  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
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

        // When the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
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

  const handleProfilePhotoUpload = async () => {
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
        setProfilePhoto(response.assets[0].uri);
      }
    }
  };

  const isValidPhoneNumber = (number) => {
    return /^[0-9]{10}$/.test(number);
  };

  const verifyPhone = () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      // showToast(
      //   "success",
      //   'response.payload.data.message',
      //  ' response.payload.data.message'
      // );
      return;
    }

    if (!password || !confirmPassword || password !== confirmPassword) {
      alert("Password is not matched");
      return;
    }

    if (!address) {
      alert("Please enter your address.");
      return;
    }

    // Validate selected category
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    if (!termsAccepted) {
      alert("Please accept the terms and conditions before signing up.");
      return;
    }

    const userData = {
      name,
      email,
      password,
      phoneNumber,
      address,
      category: selectedCategory,
      subcategories,
      userType,
      expoPushToken,
    };

    // dispatch(verifyMobileApiCall(userData))
    //   .unwrap()
    //   .then((response) => {
    //     if (response.data.success) {
    //       navigation.navigate("OTP", { userData });
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Signup error:", error);
    //     dispatch(apiFailureAction.apiFailure(error));
    //   });

    dispatch(sendOtpApiCall(userData))
      .unwrap()
      .then((response) => {
        if (response.data.success) {
          console.log("registerOtp", response.data);
          navigation.navigate("OTP", { userData });
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        dispatch(apiFailureAction.apiFailure(error));
      });
  };

  const handleTermsAndConditions = () => {};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.headingText}>{t("Create-New-Account")}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2 }}>
            <Input
              onChangeText={(text) => setName(text)}
              value={name}
              placeholder={t("Name-Placeholder")}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              style={{ ...styles.input, backgroundColor: "#092440" }}
            />
          </View>

          <View style={{ flex: 2 }}>
            <Input
              style={{ flex: 2, ...styles.input }}
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
              placeholder={t("Phone-Number-Placeholder")}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder={t("Password-Placeholder")}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          secureTextEntry
          style={styles.input}
        />

        <Input
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          placeholder={t("Confirm-Password-Placeholder")}
          secureTextEntry
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.input}
        />

        <Input
          onChangeText={(text) => setAddress(text)}
          value={address}
          placeholder={t("Address-Placeholder")}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.input}
        />

        <DropDown
          setCurrentValue={setSelectedCategory}
          setShowSubcategories={setShowSubcategories}
          currentValue={selectedCategory}
          items={professionsArray}
          placeholder={
            userType === "serviceProvider"
              ? t("Select-Category-")
              : t("Select-Occupation")
          }
        />

        {showSubcategories && (
          <SubcategoryModal
            category={selectedCategory}
            setShowSubcategories={setShowSubcategories}
            setSubcategories={setSubcategories}
            subcategories={subcategories}
            showSubcategories={showSubcategories}
          />
        )}
        <View style={styles.tc}>
          <CheckBox
            checked={termsAccepted}
            onPress={() => setTermsAccepted(!termsAccepted)}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
          />

          {/* <Text style={styles.termsText}>I accept the </Text> */}
          <TouchableOpacity onPress={handleTermsAndConditions}>
            <Text style={styles.termsTextLink}>
              {t("I-accept-the-terms-and-conditions")}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={verifyPhone}>
          <View style={styles.buttonBackground}>
            <Text style={styles.buttonText}>{t("SIGN-UP")}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>{t("Already-have-an-account?")} </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ ...styles.loginText, ...styles.loginLink }}>
              {t("Login")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#263E57",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    overflow: "scroll",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#415D79",
    color: "white",
    padding: 10,
    borderRadius: 5,
  },
  headingText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 34,
    fontWeight: 700,
  },

  loginLinkContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: 400,
    opacity: 0.7,
    marginTop: 20,
    textAlign: "center",
    color: "#FFF",
  },
  loginLink: {
    opacity: 1,
  },
  buttonContainer: {
    width: "100%",
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
  uploadButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
    marginTop: 10,
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    marginTop: 10,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  checkboxText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 0,
  },
  tc: {
    paddingBottom: 10,
    flexDirection: "row",
  },
  termsText: {
    color: "#fff",
    opacity: 0.7,
  },
  termsTextLink: {
    color: "#fff",
  },

  pickerItem: {
    color: "black",
  },

  categoryContainer: {
    marginBottom: 20,
  },

  label: {
    color: "white", // Adjust the color as needed
    fontSize: 16,
    marginTop: 10,
  },
});
export default Register;
