import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Card = ({ item, onPress }) => {
  const handlePress = (itemId) => {
    // Handle the press event for the card with itemId
  };

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={1.0} // Set activeOpacity to 1.0 to remove opacity effect
      onPress={() => onPress(item.value)}
    >
      <View style={styles.card}>
        <Image source={item.imageUrl} style={styles.cardImage} />
        <View style={styles.overlay}>
          <Text style={styles.cardTitle}>{item.label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: "row",
    padding: 10,
  },
  card: {
    position: "relative",
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "black",
  },
  cardImage: {
    width: 150,
    height: 130,
    borderRadius: 10,
    opacity: 0.4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "white",
  },
});

export default Card;
