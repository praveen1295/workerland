import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../../common/Header";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { bookingApiCall, serviceProviderByIdApiCall } from "./logic";
import { useNavigation } from "@react-navigation/native";
// import ConfirmationModal from "../Modal";
import Loading from "../Loading/index";
import ConfirmationModal from "../Modal/index";
import { apiFailureAction } from "../../commonApiLogic.Js";
import AvailabilityModal from "../MyAvailability/AvailabilityModal";
import { useTranslation } from "react-i18next";

const timesArray = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

const { height, width } = Dimensions.get("window");

const MyDatePicker = ({
  localServiceProvider,
  description,
  userData,
  myAvailability,
  category,
  subcategories,
  maxDistance,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [timeSlots, setTimeSlots] = useState([]);
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");
  const currentDate = new Date();
  const [isModalVisible, setModalVisible] = useState(false);
  const [availabilityModalVisible, setAvailabilityModalVisible] =
    useState(false);

  const { serviceProviderData, bookingData } = useSelector((state) => state);
  console.log("localServiceProvider", localServiceProvider);
  const handleConfirmBooking = () => {
    bookNow();
    setModalVisible(false);
  };

  const handleCancelBooking = () => {
    setModalVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
    hideDatePicker();
  };

  const getServiceProviderTimeSlots = () => {
    dispatch(
      serviceProviderByIdApiCall({
        serviceProviderId: localServiceProvider?._id,
      })
    )
      .then((res) => {
        if (res.payload.data.success) {
          setTimeSlots(res.payload.data.data.timeSlots[selectedDate]);
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(apiFailureAction.apiFailure(err));
      });
  };

  useEffect(() => {
    getServiceProviderTimeSlots();
  }, [selectedDate]);

  const bookNow = (timeSlot) => {
    const bookingData = {
      date: selectedDate,
      timeSlot: time,
      category,
      subcategories,
      maxDistance,
      status: "pending",
      description,
      userId: userData._id,
      serviceProviderId: localServiceProvider?._id,
      userInfo: userData,
      serviceProviderInfo: localServiceProvider,
    };
    dispatch(bookingApiCall(bookingData))
      .then((res) => {
        if (res.payload.data.success) {
          getServiceProviderTimeSlots();
          alert(res.payload.data.message);
          navigation.navigate("Main");
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(apiFailureAction.apiFailure(err));
      });
  };

  useEffect(() => {
    const currentDateTime = moment();
    const arr = timesArray
      .filter((item) => {
        const bookingDateTime = moment(
          `${selectedDate} ${item}`,
          "YYYY-MM-DD h:mm A"
        );
        return !currentDateTime.isAfter(bookingDateTime);
      })
      .map((item) => {
        let matchingSlot = "";
        if (timeSlots?.length > 0)
          matchingSlot = timeSlots?.find(
            (element) => element?.timeSlot === item
          );

        const status = matchingSlot ? matchingSlot.status : "available";

        return { timeSlot: item, status: status };
      });

    // Now, 'arr' contains the updated status based on 'timeSlots'
    console.log(arr);
    setSlots(arr);
  }, [timeSlots, timesArray, selectedDate]);

  const renderItems = ({ item, index }) => (
    <TouchableOpacity
      style={styles.timeSlotContainer}
      onPress={() => {
        setTime(item.timeSlot);
        myAvailability
          ? setAvailabilityModalVisible(true)
          : setModalVisible(true);
      }}
      disabled={
        item.status !== "available" &&
        (!myAvailability || item.status === "booked")
      }
    >
      <View
        style={[
          item.status === "available"
            ? styles.availableTimeSlot
            : styles.unavailableTimeSlot,
        ]}
      >
        <Text
          style={[
            item.status === "available"
              ? styles.availableTimeSlotText
              : styles.unavailableTimeSlotText,
          ]}
        >
          {item?.timeSlot}
        </Text>
        {/* <Text style={{ color: item.status === "available" ? "#fff" : "red" }}>
          {item?.status?.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()}
        </Text> */}
      </View>
    </TouchableOpacity>
  );

  console.log("bookingData.loading", bookingData);

  if (serviceProviderData.loading || bookingData.loading) {
    return <Loading />;
  }

  return (
    <View>
      <View style={styles.container}>
        <Header
          leftIcon={require("../../images/backBtn.png")}
          rightIcon={require("../../images/notification.svg")}
          title={myAvailability ? t("My Availability") : t("Book Your Order")}
          onclickLeftIcon={() => {
            navigation.goBack();
          }}
        />

        <View style={styles.contentContainer}>
          <Text style={styles.text}>Pick a Date</Text>
          <Button title={selectedDate} onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={currentDate}
          />

          <FlatList
            style={styles.flatListContainer}
            data={slots}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </View>
      </View>
      <View>
        {isModalVisible && (
          <View
            style={{
              backgroundColor: "#AFE1AF",
              position: "absolute",
              bottom: 0,
              height: 350,
              width: width,
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
              padding: 20,
            }}
          >
            <ConfirmationModal
              isVisible={isModalVisible}
              onConfirm={handleConfirmBooking}
              onCancel={handleCancelBooking}
            />
          </View>
        )}
      </View>
      <AvailabilityModal
        modalVisible={availabilityModalVisible}
        setModalVisible={setAvailabilityModalVisible}
        date={selectedDate}
        timeSlot={time}
        serviceProviderId={localServiceProvider?._id}
        getServiceProviderTimeSlots={getServiceProviderTimeSlots}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  timeSlotContainer: {
    width: 150, // Divide by the number of columns you want to display
    marginVertical: 8,
    marginHorizontal: 10,
  },
  availableTimeSlot: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  availableTimeSlotText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  unavailableTimeSlot: {
    backgroundColor: "#CCCCCC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  unavailableTimeSlotText: {
    color: "#999999",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyDatePicker;
