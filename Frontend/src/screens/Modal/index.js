import React from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const ConfirmationModal = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <TouchableOpacity backdropOpacity={0.5}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
          <Ionicons name="close" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.modalText}>Confirm Booking?</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={onCancel}
            buttonStyle={[styles.button, styles.cancelButton]}
          />
          <Button
            title="Confirm"
            onPress={() => onConfirm()}
            buttonStyle={[styles.button, styles.confirmButton]}
          />
        </View>
      </View>
    </TouchableOpacity>
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

export default ConfirmationModal;
