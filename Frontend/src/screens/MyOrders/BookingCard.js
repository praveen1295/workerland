// BookingCard.js
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getUserDataApiCall } from "./logic";
import Loading from "../Loading";
import { useTranslation } from "react-i18next";

const BookingCard = ({
  userId,
  handleBookingAcceptOrReject,
  isServiceProvider,
  serviceProviderAsUser,
  bookingDescription,
  handleCardClick,
  bookingData,
  getBookingUserData,
  bookingUser,
  loading,
}) => {
  const { t } = useTranslation();
  const bookingDateTime = moment(
    `${bookingData.date} ${bookingData.time}`,
    "YYYY-MM-DD h:mm A"
  );

  // Get the current date and time
  const currentDateTime = moment();

  const appointmentTimePassedFlag = bookingDateTime.isAfter(currentDateTime);

  const message = {
    type: isServiceProvider
      ? t("cancelled by service provider")
      : t("cancelled by user"),
    message: "",
  };

  useEffect(() => {
    // getUserData();
    const query = {};
    if (!isServiceProvider) {
      query.user_id = bookingData?.serviceProviderUserId;
    } else {
      query.user_id = bookingData?.userId;
    }
    getBookingUserData(query);
  }, [isServiceProvider]);

  if (loading) {
    return <Loading />;
  }
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        handleCardClick && handleCardClick(bookingData._id);
      }}
    >
      <View style={styles.header}>
        {bookingUser?.profilePhotoUrl ? (
          <Image
            source={{ uri: bookingUser?.profilePhotoUrl }}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require("../../images/profileIcon.png")}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.userName}>{bookingUser?.name}</Text>
      </View>

      <Text>{`${t("Appointment-Time")}: ${bookingData.time}`}</Text>
      <Text>{`${t("Appointment-Date")}: ${bookingData.date}`}</Text>
      <Text>{`${t("Booking-Date")}: ${moment(bookingData.createdAt).format(
        "YYYY-MM-DD"
      )}`}</Text>
      {bookingData.status && (
        <Text>{`${t("Status")}: ${bookingData.status}`}</Text>
      )}

      {bookingDescription && (
        <Text>{`${t("Description")}: ${bookingDescription}`}</Text>
      )}
      <Text>{`${t("Address")}: ${bookingUser?.address}`}</Text>

      <View style={styles.buttonsContainer}>
        {appointmentTimePassedFlag &&
        bookingData.status !== "rejected" &&
        bookingData.status !== "cancelled" ? (
          <>
            {bookingData.status === "pending" &&
              isServiceProvider &&
              !serviceProviderAsUser && (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.acceptButton]}
                    disabled={!appointmentTimePassedFlag}
                    onPress={() =>
                      handleBookingAcceptOrReject(bookingData._id, "accepted")
                    }
                  >
                    <Text style={styles.buttonText}>{t("Accept")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.rejectButton]}
                    disabled={!appointmentTimePassedFlag}
                    onPress={() =>
                      handleBookingAcceptOrReject(bookingData._id, "rejected")
                    }
                  >
                    <Text style={styles.buttonText}>{t("Reject")}</Text>
                  </TouchableOpacity>
                </>
              )}

            {serviceProviderAsUser ||
              ((bookingData.status !== "cancelled" ||
                bookingData.status !== "rejected") &&
                (bookingData?.serviceProviderUserId === userId ||
                  bookingData?.userId === userId) && (
                  <>
                    <TouchableOpacity
                      style={[styles.button, styles.rejectButton]}
                      disabled={!appointmentTimePassedFlag}
                      onPress={() =>
                        handleBookingAcceptOrReject(
                          bookingData._id,
                          "rejected",
                          message
                        )
                      }
                    >
                      <Text style={styles.buttonText}>{t("Cancel")}</Text>
                    </TouchableOpacity>
                  </>
                ))}
          </>
        ) : (
          ""
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default BookingCard;
