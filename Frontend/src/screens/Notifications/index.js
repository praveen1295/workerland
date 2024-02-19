import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { getUserDataApiCall } from "../../utils/getUser";
import Header from "../../common/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiFailureAction } from "../../commonApiLogic.Js";
import NotificationModal from "./NotificationModal";

const Notifications = ({}) => {
  const route = useRoute();
  const { userData } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading } = useSelector((state) => state.userData);

  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notification, setNotification] = useState({});

  const handleClick = (item) => {
    setNotification(item);
    if (item.type === "serviceBooking") {
      navigation.navigate("BookingDetail", { bookingId: item.data._id });
    } else {
      setShowNotificationModal(true);
    }
  };

  const renderNotifications = ({ item, index }) => {
    const userId = item?.userId; // Extract userId from item
    return (
      <TouchableOpacity key={index} onPress={() => handleClick(item)}>
        <View style={styles.itemContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View>
              <Text style={styles.headingText}>{item?.title}</Text>
              <Text style={styles.subHeadingText}>{item?.message}</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0786DAFD" barStyle="light-content" />
      <Header
        title="Notifications"
        leftIcon={require("../../images/back.png")}
        onclickLeftIcon={() => navigation.goBack()}
      />
      <View style={styles.listContainer}>
        <View>
          <Text>Clear All</Text>
        </View>
        <FlatList
          data={userData?.notification}
          renderItem={renderNotifications}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {showNotificationModal && (
        <NotificationModal
          setShowNotificationModal={setShowNotificationModal}
          notification={notification}
          showNotificationModal={showNotificationModal}
        />
      )}
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

export default Notifications;
