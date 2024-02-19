import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput,
  Modal,
} from "react-native";
import moment from "moment";
import Header from "../../common/Header";
import { Avatar, Icon, Rating } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import CommonBtn from "../../common/CommonButton";
import {
  getUserDataApiCall,
  updateBookingStatusApiCall,
} from "../MyOrders/logic";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
// import ReviewComponent from "./Reviews";
// import { getReviewApiCall } from "./logic";
import { apiFailureAction } from "../../commonApiLogic.Js";
import { FontAwesome } from "@expo/vector-icons";
import { getBookingByIdApiCall } from "./logic";
import BookingCard from "../MyOrders/BookingCard";
import { useTranslation } from "react-i18next";
// import DescriptionModal from "./DescriptionModal";

const { width, height } = Dimensions.get("window");

const BookingDetail = ({ navigation }) => {
  const route = useRoute();
  const { t } = useTranslation();
  const { bookingId } = route.params;
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const { loading: bookingLoading } = useSelector((state) => state.booking);
  const { loading: bookingUserLoading } = useSelector(
    (state) => state.userData
  );
  const [bookingUser, setBookingUser] = useState({});

  const [reviewLoading, setReviewLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [booking, setBooking] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const [description, setDescription] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const orderNow = () => {
    if (userData?.aadharPhotoUrl === "" || userData?.profilePhotoUrl === "") {
      alert(t("Adhaar-and-Profile-image"));
      navigation.navigate("ImageUpload", {
        userData,
        setShowDescriptionModal,
        getUserData,
      });
      return;
    }
    setShowDescriptionModal(true);
  };

  const getUserData = async (userId) => {
    // const jwtToken = await getData(`token`);
    setLoading(true);
    try {
      // const decodedToken = jwtDecode(jwtToken);
      dispatch(getUserDataApiCall({ user_id: userId }))
        .then((res) => {
          setUserData(res.payload.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      dispatch(apiFailureAction.apiFailure(error));
    }
  };

  const getCurrentUser = async () => {
    // const jwtToken = await getData(`token`);
    setLoading(true);
    try {
      // const decodedToken = jwtDecode(jwtToken);
      dispatch(getUserDataApiCall({}))
        .then((res) => {
          setCurrentUser(res.payload.data.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          // setLoading(false);
        });
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      dispatch(apiFailureAction.apiFailure(error));
    }
  };

  const fetchBookingDetail = () => {
    setLoading(true);
    dispatch(getBookingByIdApiCall({ bookingId }))
      .then((res) => {
        getUserData(res.payload.data.booking.userId);
        setBooking(res.payload.data.booking);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  const handleBookingAcceptOrReject = (_, status) => {
    setLoading(true);
    dispatch(updateBookingStatusApiCall({ bookingId: booking._id, status }))
      .then((res) => {
        if (res.payload.data.success) {
          fetchBookingDetail();
          // getBookingHistory();
          alert("Appointment  updated successfully");
        } else {
          alert(res.payload.data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        dispatch(apiFailureAction.apiFailure(err));
        setLoading(false);
      });
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
    // getUserData();
    fetchBookingDetail();
    getCurrentUser();
  }, []);

  if (loading || bookingLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../../images/backBtn.png")}
        rightIcon={require("../../images/headerStar.png")}
        rightIcon2={require("../../images/headerMessage.png")}
        title={t("Booking Detail")}
        onclickLeftIcon={() => {
          navigation.goBack();
        }}
      />

      <ScrollView style={styles.detailContainer}>
        {/* <View style={styles.detailContainer1}> */}
        <View style={styles.serviceProviderInfoContainer}>
          <View style={styles.serviceProviderInfoContainer2}>
            {bookingUser.profilePhotoUrl ? (
              <Avatar
                rounded
                size={"large"}
                source={{
                  uri: bookingUser.profilePhotoUrl,
                }}
              />
            ) : (
              <Avatar
                rounded
                size={"large"}
                source={require("../../images/profileIcon.png")}
              />
            )}

            <View style={styles.serviceProviderInfo}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  {bookingUser?.name}
                </Text>
                <Text style={styles.details}>{bookingUser?.category}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Icon
                  name="map-marker"
                  type="font-awesome"
                  color="#9E9E9E"
                  style={styles.icon}
                  outline
                />
                <Text style={styles.details}>{bookingUser?.address}</Text>
              </View>
              {/* <View style={styles.detailsContainer}>
                <Image
                  source={require("../../images/distanceIcon.png")}
                  style={styles.icon}
                />
                <Text style={styles.details}>
                  {userData?.distance / 1000} km
                </Text>
              </View> */}
              {/* <View style={styles.followBtnContainer}>
                <View>
                  <Button
                    style={{ width: 50, height: 50 }}
                    title="Follow"
                    color="#FFA61D"
                  />
                </View>
                <View style={styles.detailsContainer}>
                  <Rating
                    // showRating
                    readonly
                    startingValue={userData?.averageRating || 0}
                    ratingCount={5}
                    imageSize={20}
                    // onFinishRating={
                    //   userData?.averageRating
                    // }
                    style={{ paddingVertical: 10, fontSize: 10 }}
                  />
                </View>
                <Text style={{ marginLeft: 10 }}>
                  ({userData?.ratingCount || 0})
                </Text>
              </View> */}
            </View>
          </View>
        </View>
        {/* </View> */}
        <View style={styles.detailContainer2}>
          <Text style={styles.headingText}>{t("Booking-Detail")}</Text>
          <BookingCard
            handleBookingAcceptOrReject={handleBookingAcceptOrReject}
            isServiceProvider={currentUser.isServiceProvider}
            userId={currentUser._id}
            bookingData={booking}
            getBookingUserData={getBookingUserData}
            bookingUser={bookingUser}
            loading={bookingUserLoading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  detailContainer: {
    flex: 1,
    gap: 20,
  },
  detailContainer1: {
    flex: 1,
    // padding: 20, // Adjust padding as needed
  },

  serviceProviderInfoContainer: {
    // flex: 1,
    // height: 350,
    width: width,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20, // Adjust padding as needed
  },

  serviceProviderInfoContainer2: {
    flexDirection: "row",
    gap: 25,
  },
  serviceProviderInfo: {
    gap: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  details: {
    fontWeight: "400",
    color: "#9E9E9E",
    width: 200,
  },
  icon: {
    width: 25,
    height: 25,
  },
  followBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    gap: 4,
  },

  detailContainer2: {
    flex: 1,
    gap: 20,
    backgroundColor: "#fff",
    padding: 20, // Adjust padding as needed
  },
  btnContainer: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 25,
  },

  headingText: {
    fontSize: 17,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#4CAF50", // Green color
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: "#F44336", // Red color
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BookingDetail;
