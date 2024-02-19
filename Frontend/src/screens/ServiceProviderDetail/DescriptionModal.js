import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const DescriptionModal = ({
  setShowDescriptionModal,
  handleInputChange,
  handleSubmit,
  showDescriptionModal,
  description,
}) => {
  const { t } = useTranslation();
  return (
    <Modal transparent visible={showDescriptionModal}>
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
            onPress={() => setShowDescriptionModal(false)}
          >
            <FontAwesome name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            {t("Enter-your-work-description")}
          </Text>
          <TextInput
            style={{
              height: 100,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
              width: "100%",
            }}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={handleInputChange}
            placeholder={t("Type-your-description-here")}
          />
          <TouchableOpacity
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
            <Text style={{ color: "#fff" }}>{t("Submit")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DescriptionModal;
