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
} from "react-native";
import Header from "../../common/Header";
import { Avatar, Icon } from "react-native-elements";
import { useRoute } from "@react-navigation/native";
import CommonBtn from "../../common/CommonButton";
import { getUserDataApiCall } from "../../utils/getUser";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { apiFailureAction } from "../../commonApiLogic.Js";
import { changeAccountStatusApiCall } from "../AdminOrder/logic";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

const UserDetail = ({ navigation }) => {
  const route = useRoute();
  const { userInfo } = route.params;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  // const { data: userData } = useSelector((state) => state.getUserData);
  const orderNow = () => {
    if (userData?.aadharPhotoUrl === "" || userData?.profilePhotoUrl === "") {
      alert(
        "Adhaar and Profile image is required for order. Plese upload your Adhaar and Profile image"
      );
      navigation.navigate("ImageUpload", { localServiceProvider });
      return;
    }
    navigation.navigate("BookingScreen", { localServiceProvider });
  };
  const HandleAccept = () => {};

  const getUserData = async () => {
    // const jwtToken = await getData(`token`);
    setLoading(true);
    try {
      // const decodedToken = jwtDecode(jwtToken);
      dispatch(getUserDataApiCall({ user_id: userInfo._id }))
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

  const getCurrentUserData = async () => {
    // const jwtToken = await getData(`token`);
    setLoading(true);
    try {
      // const decodedToken = jwtDecode(jwtToken);
      dispatch(getUserDataApiCall({}))
        .then((res) => {
          setCurrentUserData(res.payload.data.data);
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

  const handleApprove = (title, userId) => {
    const status = title === "Approve" ? "approved" : "rejected";
    const userIds = [userId];
    setLoading(true);
    dispatch(
      changeAccountStatusApiCall({
        userIds,
        status: status,
      })
    )
      .then((res) => {
        if (res.payload.data.success) {
          alert("status updated successfully");
          getUserData();
          setLoading(false);
        }
      })
      .catch((err) => {
        dispatch(apiFailureAction.apiFailure(err));
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserData();
    getCurrentUserData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../../images/backBtn.png")}
        rightIcon={require("../../images/headerStar.png")}
        rightIcon2={require("../../images/headerMessage.png")}
        title={
          userData.isServiceProvider
            ? t("Service-Providers-Details")
            : t("Worker-Details")
        }
        onclickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={styles.detailContainer}>
        {/* <View style={styles.detailContainer1}> */}
        <View style={styles.serviceProviderInfoContainer}>
          <View style={styles.serviceProviderInfoContainer2}>
            {userData.profilePhotoUrl ? (
              <Avatar
                rounded
                size={"large"}
                source={{
                  uri: userData?.profilePhotoUrl,
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
                  {userData.name}
                </Text>
                {/* <Text style={styles.details}>{userData?.serviceType[0]}</Text> */}
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
                <Text style={styles.details}>{userData.address}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Image
                  source={require("../../images/distanceIcon.png")}
                  style={styles.icon}
                />
                {/* <Text style={styles.details}>
                  {userData.distance / 1000} km
                </Text> */}
              </View>
              <View style={styles.followBtnContainer}>
                <View style={{ width: 134, height: 50 }}>
                  <Button
                    style={{ width: 50, height: 50 }}
                    title="Follow"
                    color="#FFA61D"
                  />
                </View>
                <View style={styles.detailsContainer}>
                  <Icon
                    name="star"
                    type="font-awesome"
                    color="yellow"
                    style={styles.icon}
                    outline
                  />
                  <Text>{"(211)"}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* </View> */}
        <View style={styles.detailContainer2}>
          <Text style={styles.headingText}>My Services</Text>

          <Text style={styles.details}>
            Installing water drums Maintenance of water pipes Maintenance and
            installation of sanitation Installing water pumps Installing water
            taps
          </Text>

          {(currentUserData.isServiceProvider || currentUserData.isAdmin) && (
            <View>
              {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.headingText}>Reviews</Text>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
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
                  2
                </Text>
                <Image source={require("../../images/rightArrow.png")} />
              </TouchableOpacity>
            </View> */}
              {currentUserData.isServiceProvider && (
                <View style={styles.btnContainer}>
                  <>
                    <CommonBtn
                      title={t("Accept")}
                      bgColor={"#263E57"}
                      handleClick={HandleAccept}
                    />
                    <CommonBtn
                      title={t("Reject")}
                      bgColor={"red"}
                      handleClick={orderNow}
                    />
                  </>
                </View>
              )}

              {currentUserData.isAdmin && (
                <>
                  {userData.status === "pending" ? (
                    <View style={styles.btnContainer}>
                      <CommonBtn
                        title={t("Accept")}
                        bgColor={"#263E57"}
                        handleClick={() =>
                          handleApprove("Approve", userData?._id)
                        }
                      />
                      <CommonBtn
                        title={t("Reject")}
                        bgColor={"red"}
                        handleClick={orderNow}
                      />
                    </View>
                  ) : (
                    <View style={styles.btnContainer}>
                      {userData.status !== "approved" ? (
                        <CommonBtn
                          title={t("Approve")}
                          bgColor={"#263E57"}
                          handleClick={() =>
                            handleApprove("Approve", userData?._id)
                          }
                        />
                      ) : (
                        <CommonBtn
                          title={t("Reject")}
                          bgColor={"red"}
                          handleClick={() =>
                            handleApprove("Reject", userData._id)
                          }
                        />
                      )}
                    </View>
                  )}
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    gap: 2,
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

export default UserDetail;
