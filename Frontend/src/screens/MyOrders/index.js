import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { Avatar, CheckBox } from "react-native-elements";
import CommonBtn from "../../common/CommonButton";
import { jwtDecode } from "jwt-decode";
import {
  bookingHistoryApiCall,
  changeAccountStatusApiCall,
  getRequestsApiCAll,
} from "./logic";
import { useDispatch } from "react-redux";
import { getData } from "../../utils/storageService";
import { useRoute } from "@react-navigation/native";
import UserOrders from "./UserOrders";
import ServiceProviderOrders from "./ServiceProviderOrders";
import { getUserDataApiCall } from "../../utils/getUser";

const { width, height } = Dimensions.get("window");

const MyOrders = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  // const { userData } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const getUserData = async (userId) => {
    // const jwtToken = await getData(`token`);

    setLoading(true);
    try {
      dispatch(getUserDataApiCall())
        .then((res) => {
          setUserData(res.payload.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      dispatch(apiFailureAction.apiFailure(error));
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // changeColor("green");
      getUserData();
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
      <StatusBar backgroundColor="#0786DAFD" barStyle="light-content" />
      {userData.isServiceProvider ? (
        <ServiceProviderOrders userData={userData} />
      ) : (
        <UserOrders userData={userData} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  headingText: {
    fontWeight: "600",
    fontSize: 17,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default MyOrders;
