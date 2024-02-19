import React, { useEffect } from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { updateBookingStatusApiCall } from "../MyOrders/logic";
import { FontAwesome } from "@expo/vector-icons";

const NotificationModal = ({
  notification,
  setShowNotificationModal,
  showNotificationModal,
}) => {
  const dispatch = useDispatch();

  const onCancel = () => {
    setShowNotificationModal(false);
  };

  // useEffect(() => {
  //   if (notification.type === "New-appointment-request") {
  //     dispatch(updateBookingStatusApiCall({ bookingId, status }))
  //       .then((res) => {
  //         if (res.payload.data.success) {
  //           getBookingHistory();
  //           // alert("Appointment  updated successfully");
  //         }
  //       })
  //       .catch((err) => {
  //         dispatch(apiFailureAction.apiFailure(err));
  //       });
  //   }
  // }, []);

  return (
    <Modal transparent visible={showNotificationModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            height: 250,
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={() => setShowNotificationModal(false)}
          >
            <FontAwesome name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            {notification?.message}
          </Text>

          {/* <TouchableOpacity
            style={{
              marginTop: 15,
              backgroundColor: "#000",
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={{ color: "#fff" }}>Submit</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333333",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: 100,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "red", // Gray color
  },
  confirmButton: {
    backgroundColor: "green", // Green color
  },
});

export default NotificationModal;
