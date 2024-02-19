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
import Header from "../../common/Header";
import { Avatar, Icon, Rating } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import CommonBtn from "../../common/CommonButton";
import { getUserDataApiCall } from "../MyOrders/logic";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import ReviewComponent from "./Reviews";
import { getReviewApiCall } from "./logic";
import { apiFailureAction } from "../../commonApiLogic.Js";
import { FontAwesome } from "@expo/vector-icons";
import DescriptionModal from "./DescriptionModal";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

const ServiceProviderDetail = ({ navigation }) => {
  const route = useRoute();
  const { localServiceProvider } = route.params;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  // const { data: userData } = useSelector((state) => state.getUserData);

  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);

  const [description, setDescription] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const handleInputChange = (text) => {
    setDescription(text);
  };

  const fetchReviews = async () => {
    try {
      setReviewLoading(true);
      dispatch(
        getReviewApiCall({
          serviceProviderId: localServiceProvider.details._id,
          page,
          pageSize: 10,
        })
      )
        .then((response) => {
          if (response.payload.data.success) {
            const newReviews = response.payload.data.reviews;

            setReviews((prevReviews) => [...prevReviews, ...newReviews]);
            setReviewCount(response.payload.data.total);
            setPage(page + 1);
          }
        })
        .catch((error) => {
          dispatch(apiFailureAction.apiFailure(error));
        });
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    } finally {
      setReviewLoading(false);
    }
  };

  const orderNow = () => {
    if (userData?.aadharPhotoUrl === "" || userData?.profilePhotoUrl === "") {
      alert(t("Adhaar-and-Profile-image"));
      navigation.navigate("ImageUpload", {
        localServiceProvider,
        setShowDescriptionModal,
        getUserData,
      });
      return;
    }

    if (userData.isServiceProvider) {
      if (localServiceProvider?.details?.userId === userData._id) {
        alert("its's look like worker and work provider are same");
        return;
      }
    }
    setShowDescriptionModal(true);
  };

  const handleSubmit = () => {
    navigation.navigate("BookingScreen", { localServiceProvider, description });
  };

  const callNow = () => {
    if (userData.isServiceProvider) {
      if (localServiceProvider?.details?.userId === userData._id) {
        alert("its's look like worker and work provider are same");
        return;
      }
    }
    const phoneNumber = localServiceProvider?.details?.phoneNumber;
    const url = `tel:${phoneNumber}`;

    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          console.error("Phone dialer is not supported on this device");
        }
      })
      .catch((error) => console.error("Error opening phone dialer:", error));
  };

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
          setLoading(false);
        });
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      dispatch(apiFailureAction.apiFailure(error));
    }
  };

  const renderStar = () => {
    if (localServiceProvider?.details?.averageRating > 0) {
      for (let i = 0; i < localServiceProvider?.details?.averageRating; i++) {
        return (
          <Icon
            name="star"
            type="font-awesome"
            color="yellow"
            style={styles.icon}
            outline
          />
        );
      }
    } else {
      return (
        <Icon
          name="star"
          type="font-awesome"
          color="yellow"
          style={styles.icon}
          outline
        />
      );
    }
  };
  const fetchReviewCount = () => {};

  useEffect(() => {
    getUserData();
    fetchReviews();
    fetchReviewCount();
  }, [navigation.navigate]);

  if (loading || reviewLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../../images/backBtn.png")}
        rightIcon={require("../../images/headerStar.png")}
        rightIcon2={require("../../images/headerMessage.png")}
        title={t("Service-Provider")}
        onclickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      {showDescriptionModal && (
        <DescriptionModal
          handleSubmit={handleSubmit}
          setShowDescriptionModal={setShowDescriptionModal}
          handleInputChange={handleInputChange}
          showDescriptionModal={showDescriptionModal}
          description={description}
        />
      )}
      <ScrollView style={styles.detailContainer}>
        {/* <View style={styles.detailContainer1}> */}
        <View style={styles.serviceProviderInfoContainer}>
          <View style={styles.serviceProviderInfoContainer2}>
            {localServiceProvider?.details?.profilePhotoUrl ? (
              <Avatar
                rounded
                size={"large"}
                source={{
                  uri: localServiceProvider?.details?.profilePhotoUrl,
                }}
              />
            ) : (
              <Icon
                name="user-circle-o"
                type="font-awesome"
                color="#9E9E9E"
                size={60}
                style={{ borderRadius: 60 }}
              />
            )}

            <View style={styles.serviceProviderInfo}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  {localServiceProvider?.details?.name}
                </Text>
                <Text style={styles.details}>
                  {localServiceProvider?.details?.category}
                </Text>
              </View>
              <View>
                <Text style={styles.details}>
                  10 years experience in maintenance of everything related to
                  plumbing and holds a certificate of appreciation for my great
                  accomplishments
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Icon
                  name="map-marker"
                  type="font-awesome"
                  color="#9E9E9E"
                  style={styles.icon}
                  outline
                />
                <Text style={styles.details}>
                  {localServiceProvider?.details?.address}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Image
                  source={require("../../images/distanceIcon.png")}
                  style={styles.icon}
                />
                <Text style={styles.details}>
                  {localServiceProvider?.details?.distance / 1000} km
                </Text>
              </View>
              <View style={styles.followBtnContainer}>
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
                    startingValue={
                      localServiceProvider?.details?.averageRating || 0
                    }
                    ratingCount={5}
                    imageSize={20}
                    // onFinishRating={
                    //   localServiceProvider?.details?.averageRating
                    // }
                    style={{ paddingVertical: 10, fontSize: 10 }}
                  />
                </View>
                <Text style={{ marginLeft: 10 }}>
                  ({localServiceProvider?.details?.ratingCount || 0})
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* </View> */}
        <View style={styles.detailContainer2}>
          <Text style={styles.headingText}>{t("My-Services")}</Text>

          <Text style={styles.details}>
            Installing water drums Maintenance of water pipes Maintenance and
            installation of sanitation Installing water pumps Installing water
            taps
          </Text>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.headingText}>{t("Reviews")}</Text>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                onPress={() => setShowReview(!showReview)}
              >
                <Text
                  style={{
                    width: 30,
                    height: 20,
                    borderRadius: 30,
                    backgroundColor: "#263E57",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  {reviewCount}
                </Text>
                <Image source={require("../../images/rightArrow.png")} />
              </TouchableOpacity>
            </View>
            {showReview && (
              <ReviewComponent
                reviewLoading={reviewLoading}
                reviews={reviews}
                fetchReviews={fetchReviews}
                serviceProviderId={localServiceProvider.details._id}
              />
            )}
            <View style={styles.btnContainer}>
              <CommonBtn
                title={
                  t("Call-Now") +
                  `${localServiceProvider?.details?.phoneNumber}`
                }
                bgColor={"#263E57"}
                handleClick={callNow}
              />
              <CommonBtn
                title={t("Book-Service")}
                bgColor={"#000000"}
                handleClick={orderNow}
              />
            </View>
          </View>
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
});

export default ServiceProviderDetail;
