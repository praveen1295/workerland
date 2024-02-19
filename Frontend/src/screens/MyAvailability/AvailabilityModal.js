import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  //   CheckBox,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useDispatch } from "react-redux";
import { updateAvailabilityApiCall } from "./logic";
import { apiFailureAction } from "../../commonApiLogic";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const AvailabilityModal = ({
  modalVisible,
  setModalVisible,
  serviceProviderId,
  date,
  timeSlot,
  getServiceProviderTimeSlots,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [available, setAvailable] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  console.log("serviceProviderId", serviceProviderId);
  const handleAvailableCheckbox = () => {
    setAvailable(!available);
    // If you want to uncheck "Not Available" when "Available" is checked
    setNotAvailable(false);
  };

  const handleNotAvailableCheckbox = () => {
    setNotAvailable(!notAvailable);
    // If you want to uncheck "Available" when "Not Available" is checked
    setAvailable(false);
  };

  const handleSubmit = () => {
    if (!available && !notAvailable) {
      alert("Please choose any one.");
      return;
    }
    // Your submit logic here
    const status = available ? t("available") : t("notAvailable");
    dispatch(
      updateAvailabilityApiCall({ serviceProviderId, date, timeSlot, status })
    )
      .then((res) => {
        console.log("resssss", res.payload.data);
        if (res.payload.data.success) {
          getServiceProviderTimeSlots();
        }
      })
      .catch((err) => {
        dispatch(apiFailureAction.apiFailure(err));

        console.log(err);
      });

    // Close the modal
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal transparent visible={modalVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
        // onPress={() => setModalVisible(false)}
      >
        <View
          style={{
            width: "90%",
            height: "40%",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={handleCloseModal}
          >
            <FontAwesome name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            {t("Update-your-availability")}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <CheckBox
              title="Available"
              checked={available}
              onPress={handleAvailableCheckbox}
            />
            <CheckBox
              title="Not Available"
              checked={notAvailable}
              onPress={handleNotAvailableCheckbox}
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: 15,
              backgroundColor: "#000",
              padding: 10,
              borderRadius: 5,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "#fff" }}>{t("Submit")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AvailabilityModal;
