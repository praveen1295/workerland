import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import { subcategoriesData } from "./subcategoriesData";

const SubcategoryModal = ({
  setSubcategories,
  category,
  showSubcategories,
  setShowSubcategories,
}) => {
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const subcategories = subcategoriesData[category];

  const toggleSubcategory = (subcategory) => {
    const isSelected = selectedSubcategories.includes(subcategory);
    if (isSelected) {
      setSelectedSubcategories(
        selectedSubcategories.filter((item) => item !== subcategory)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  return (
    <Modal transparent visible={showSubcategories}>
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
            height: 350, // Adjust height based on your content
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={() => setShowSubcategories(false)}
          >
            <FontAwesome name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Select subcategories
          </Text>
          <FlatList
            data={subcategories}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <CheckBox
                  checked={selectedSubcategories.includes(item.value)}
                  onPress={() => toggleSubcategory(item.value)}
                />
                <Text style={{ marginLeft: 10 }}>{item.label}</Text>
              </View>
            )}
          />
          <TouchableOpacity
            style={{
              marginTop: 15,
              backgroundColor: "#000",
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              setSubcategories(selectedSubcategories);
              setShowSubcategories(false);
            }}
          >
            <Text style={{ color: "#fff" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SubcategoryModal;
