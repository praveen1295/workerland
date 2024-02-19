import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import MyDatePicker from "../Calender";
import { useRoute } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import { getData } from "../../utils/storageService";
import { decode, encode } from "base-64";
import { useDispatch } from "react-redux";
import { getUserDataApiCall } from "../AdminOrder/logic";
import Loading from "../Loading";
import { apiFailureAction } from "../../commonApiLogic.Js";
import { useTranslation } from "react-i18next";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const BookingScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { t } = useTranslation();
  const {
    localServiceProvider,
    description,
    category,
    subcategories,
    maxDistance,
  } = route.params;
  // const [userId, setUserId] = useState("token");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    // const jwtToken = await getData(`token`);
    setLoading(true);
    try {
      // const decodedToken = jwtDecode(jwtToken);
      dispatch(getUserDataApiCall({}))
        .then((res) => {
          setUserData(res.payload.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          dispatch(apiFailureAction.apiFailure(error));
          setLoading(false);
        });
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  };

  const fetchToken = async () => {
    try {
      const token = await getData("token");
      console.warn("token", token);
      // Decode URL-encoded token if needed

      if (token) {
        const [encodedHeader, encodedBody, signature] = token
          .toString()
          .split(".");
        const decoded = JSON.parse(atob(encodedBody));
        console.warn("Decoded token:", decoded);
        setUserId(decoded.id);

        // const decodedToken = jwtDecode(decodeURIComponent());
      }
    } catch (error) {
      console.error("Error fetching or decoding token:", error);
    }
  };

  useEffect(() => {
    // fetchToken();

    getUserData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  console.warn("userData", userData);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0786DAFD" barStyle="light-content" />
      <MyDatePicker
        localServiceProvider={localServiceProvider?.details}
        description={description}
        userData={userData}
        category={category}
        subcategories={subcategories}
        maxDistance={maxDistance}
      />
      {/* <Text> {userId}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure it takes the entire screen
    justifyContent: "center", // Align children vertically in the center
    alignItems: "center", // Align children horizontally in the center
  },
});

export default BookingScreen;
