import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { Avatar, CheckBox, Icon } from "react-native-elements";
import CommonBtn from "../../common/CommonButton";
import { jwtDecode } from "jwt-decode";
import {
  changeAccountStatusApiCall,
  getRequestsApiCAll,
  // getUserDataApiCall,
} from "./logic";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils/storageService";
import { useRoute } from "@react-navigation/native";
import { apiFailureAction } from "../../commonApiLogic.Js";
import { Ionicons } from "@expo/vector-icons";
import { getUserDataApiCall } from "../../utils/getUser";
import Loader from "../../common/Loader";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");
const moreData = [
  { id: 0, title: "Total-Orders", status: "" },
  { id: 1, title: "Payment-Pending" },
  { id: 2, title: "Incomplete" },
  { id: 3, title: "Pending-Requests", status: "pending" },
];

const More = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { t } = useTranslation();
  const { userData } = route.params;
  const { loading: userLoading } = useSelector((state) => state.userData);
  const { loading: requestsLoading } = useSelector(
    (state) => state.getRequests
  );

  const [showDetailIdx, setShowDetailIdx] = useState(-1);
  const [pendingRequestsSelectedArray, setPendingRequestsSelectedArray] =
    useState([]);

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequest] = useState({
    pending: [],
    rejected: [],
    approved: [],
  });
  const [requestsCount, setRequestsCount] = useState({
    pending: 0,
    rejected: 0,
    approved: 0,
    all: 0,
  });

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [details, setDetails] = useState({});
  const [newUserData, setNewUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const getAdminRequests = () => {
    dispatch(getRequestsApiCAll({ count: true, adminId: userData._id }))
      .then((res) => {
        if (res.payload.data.success) {
          setRequestsCount(res.payload.data.data.requestsCounts[0]);
          setRequests(res.payload.data.data.requests);
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
          getAdminRequests();
        }
      })
      .catch((err) => {
        dispatch(apiFailureAction.apiFailure(err));
      });
  };

  useEffect(() => {
    const obj =
      requests.length > 0
        ? {
            pending: requests.filter((item) => item?.status === "pending"),
            rejected: requests.filter((item) => item?.status === "rejected"),
            approved: requests.filter((item) => item?.status === "rejected"),
          }
        : {};
    setFilteredRequest(obj);
  }, [requests]);

  const showUserDetail = (item) => {
    console.log("item", item);
    getUserData(item.userId);
    setOpenDetailModal(true);
    setDetails(item);
  };

  const getUserData = async (userId) => {
    // const jwtToken = await getData(`token`);
    setLoading(true);
    try {
      console.warn("user_id", userId);
      dispatch(getUserDataApiCall({ user_id: userId }))
        .then((res) => {
          console.log("newUserData, ", res.payload.data);
          setNewUserData(res.payload.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      dispatch(apiFailureAction.apiFailure(error));
      setLoading(false);
    }
  };

  const moreInf = (newUserData) => {
    newUserData.isServiceProvider
      ? navigation.navigate("serviceProviderDetail", {
          localServiceProvider: newUserData,
        })
      : navigation.navigate("UserDetail", { userInfo: newUserData });
  };

  useEffect(() => {
    getAdminRequests();
  }, []);

  console.log("userLoading", userLoading);
  if (loading || requestsLoading) {
    return <Loader />;
  }

  const renderPendingRequest = ({ item, index }) => {
    const userId = item?.userId; // Extract userId from item
    return (
      <View key={index}>
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            onPress={() => showUserDetail(item)}
          >
            {item.profilePhotoUrl ? (
              <Avatar
                rounded
                size={"large"}
                source={{
                  uri: item.profilePhotoUrl,
                }}
              />
            ) : (
              <Avatar
                rounded
                size={"large"}
                source={require("../../images/profileIcon.png")}
              />
            )}

            {console.log("items", item)}
            <View>
              <Text style={styles.headingText}>{item?.name}</Text>
              <Text style={styles.subHeadingText}>{item?.category}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            {/* <Text
              style={{
                width: 30,
                height: 20,
                borderRadius: 30,
                backgroundColor: item === "Incomplete" ? "green" : "#263E57",
                textAlign: "center",
                color: "#fff",
              }}
            >
              2
            </Text> */}
            {/* <Image source={require("../../images/rightArrow.png")} /> */}

            {item.status === "pending" && (
              <CheckBox
                checked={pendingRequestsSelectedArray.includes(userId)}
                onPress={() => checkboxClick(userId)}
                containerStyle={{ marginLeft: 10 }}
              />
            )}
          </View>
        </View>
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
              ? requestsCount?.all
              : item.id === 3
              ? requestsCount?.pending
              : ""}
          </Text>
          <Image source={require("../../images/rightArrow.png")} />
        </View>
      </TouchableOpacity>

      {showDetailIdx === index && item === moreData[0] && (
        <FlatList
          data={requests}
          renderItem={renderPendingRequest}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {showDetailIdx === index && item === moreData[3] ? (
        <FlatList
          data={filteredRequests.pending}
          renderItem={renderPendingRequest}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        ""
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0786DAFD" barStyle="light-content" />
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
              title={t("Approve")}
              handleClick={handleApprove}
              bgColor={"black"}
            />
            <CommonBtn
              title={t("Reject")}
              handleClick={handleApprove}
              bgColor={"red"}
            />
          </View>
        )}
      </View>
      <View>
        {openDetailModal && (
          <View style={styles.serviceProviderInfoContainer}>
            <View style={styles.serviceProviderInfoContainer2}>
              {console.log("aadhar photo url", newUserData.aadharPhotoUrl)}
              {newUserData.aadharPhotoUrl ? (
                <Image
                  source={{ uri: newUserData.aadharPhotoUrl }}
                  style={{ width: "100%", height: 200, zIndex: 100 }}
                  onError={(err) => console.log("Error loading image", err)}
                />
              ) : (
                <Text>{t("No-aadhar-found")}</Text>
              )}

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setOpenDetailModal(false)}
              >
                <Ionicons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <CommonBtn
              title={t("More-Information")}
              bgColor={"#263E57"}
              handleClick={() => moreInf(newUserData)}
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

  serviceProviderInfoContainer: {
    position: "absolute",
    bottom: 0,
    height: 500,
    width: width,
    paddingTop: 34,
    paddingHorizontal: 0,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: "center",
    gap: 40,
  },

  serviceProviderInfoContainer2: {
    width: "90%",
    alignItems: "center",
  },

  closeButton: {
    position: "absolute",
    top: -20,
    right: -14,
  },

  detailsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  details: {
    fontWeight: "400",
    color: "#9E9E9E",
    flexWrap: "wrap",
    width: 155,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default More;
