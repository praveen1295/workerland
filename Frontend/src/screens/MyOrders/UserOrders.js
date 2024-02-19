import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
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
  getUserDataApiCall,
  updateBookingStatusApiCall,
} from "./logic";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils/storageService";
import { useNavigation, useRoute } from "@react-navigation/native";
import BookingCard from "./BookingCard";
import Loading from "../Loading";
import { apiFailureAction } from "../../commonApiLogic.Js";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");
const moreData = [
  { id: 0, title: "Pending-Requests", status: "" },
  { id: 1, title: "Accepted/Completed" },
  { id: 2, title: "Rejected/Canceled" },
  // { id: 3, title: "Pending Requests", status: "pending" },
];

const UserOrders = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { userData } = route.params;
  const { t } = useTranslation();
  const { loading } = useSelector((state) => state.bookingHistoryData);
  const { loading: bookingUserLoading } = useSelector(
    (state) => state.userData
  );
  const [bookingUser, setBookingUser] = useState({});

  const [showDetailIdx, setShowDetailIdx] = useState(-1);
  const [pendingRequestsSelectedArray, setPendingRequestsSelectedArray] =
    useState([]);

  const [bookings, setBookings] = useState({});
  // const [bookings, setFilteredRequest] = useState({
  //   pending: [],
  //   rejected: [],
  //   approved: [],
  // });
  const [requestsCount, setRequestsCount] = useState({
    pending: 0,
    rejected: 0,
    approved: 0,
    All: 0,
  });

  const getBookingHistory = () => {
    dispatch(bookingHistoryApiCall({}))
      .then((res) => {
        if (res.payload.data.success) {
          setBookings(res.payload.data.allBookings);
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(apiFailureAction.apiFailure(err));
      });
  };

  const handlePress = (item, idx) => {
    if (showDetailIdx === idx) setShowDetailIdx(-1);
    else setShowDetailIdx(idx);
  };

  const set = new Set();
  const checkboxClick = (userId, idx) => {
    for (checked of pendingRequestsSelectedArray) {
      set.add(checked);
    }
    if (set.has(userId)) {
      set.delete(userId);
    } else {
      set.add(userId);
    }

    setPendingRequestsSelectedArray([...set]);
  };

  const handleApprove = (title) => {
    const status = title === "Approve" ? "approved" : "rejected";
    dispatch(
      changeAccountStatusApiCall({
        userIds: pendingRequestsSelectedArray,
        status: status,
      })
    )
      .then((res) => {
        if (res.payload.data.success) {
          alert("status updated successfully");
          setPendingRequestsSelectedArray([]);
          // getAdminRequests();
        }
      })
      .catch((err) => {
        dispatch(apiFailureAction.apiFailure(err));
      });
  };

  const handleBookingAcceptOrReject = (bookingId, status) => {
    dispatch(updateBookingStatusApiCall({ bookingId, status }))
      .then((res) => {
        if (res.payload.data.success) {
          // getBookingHistory();
          // alert("Appointment  updated successfully");
        } else {
          alert(res.payload.data.message);
        }
      })
      .catch((err) => {
        dispatch(apiFailureAction.apiFailure(err));
      });
  };
  const handleCardClick = (bookingId) => {
    navigation.navigate("BookingDetail", { bookingId });
  };

  const getBookingUserData = async (query) => {
    try {
      // const decodedToken = jwtDecode(jwtToken);
      dispatch(getUserDataApiCall(query))
        .then((res) => {
          setBookingUser(res.payload.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      dispatch(apiFailureAction.apiFailure(error));
    }
  };

  useEffect(() => {
    getBookingHistory();
  }, []);

  const renderPendingRequest = ({ item, index }) => {
    const userId = item?.userId; // Extract userId from item
    return (
      <View key={index}>
        <BookingCard
          bookingDescription={item?.description}
          handleBookingAcceptOrReject={handleBookingAcceptOrReject}
          isServiceProvider={userData.isServiceProvider}
          handleCardClick={handleCardClick}
          userId={userData._id}
          bookingData={item}
          getBookingUserData={getBookingUserData}
          bookingUser={bookingUser}
          loading={bookingUserLoading}
        />
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handlePress(item, index)}
      >
        <Text style={styles.headingText}>{t(item.title)}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text
            style={{
              width: 30,
              height: 20,
              borderRadius: 30,
              backgroundColor: item === "Incomplete" ? "green" : "#263E57",
              textAlign: "center",
              color: "#fff",
            }}
          >
            {item.id === 0
              ? bookings.pending?.length
              : item.id === 1
              ? bookings.completed?.length + bookings.accepted?.length
              : item.id === 2
              ? bookings.rejected?.length
              : ""}
          </Text>
          <Image source={require("../../images/rightArrow.png")} />
        </View>
      </TouchableOpacity>
      {showDetailIdx === index && item === moreData[0] ? (
        <FlatList
          data={bookings.pending}
          renderItem={renderPendingRequest}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        ""
      )}
      {showDetailIdx === index && item === moreData[1] ? (
        <FlatList
          data={[...bookings?.completed, ...bookings?.accepted]}
          renderItem={renderPendingRequest}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        ""
      )}
      {showDetailIdx === index && item === moreData[2] ? (
        <FlatList
          data={bookings.rejected}
          renderItem={renderPendingRequest}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        ""
      )}
    </View>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../../images/backBtn.png")}
        rightIcon={require("../../images/notification.svg")}
        title={"My Orders"}
        onclickLeftIcon={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={moreData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View
        style={{
          width: width,
          alignItems: "center",
          position: "absolute",
          bottom: 10,
        }}
      >
        {pendingRequestsSelectedArray.length > 0 && (
          <View style={{ justifyContent: "center", gap: 5 }}>
            <CommonBtn
              title={"Approve"}
              handleClick={handleApprove}
              bgColor={"black"}
            />
            <CommonBtn
              title={"Reject"}
              handleClick={handleApprove}
              bgColor={"red"}
            />
          </View>
        )}
      </View>
    </View>
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

export default UserOrders;
