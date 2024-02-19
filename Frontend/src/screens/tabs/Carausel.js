import React from "react";
import { View, ImageBackground, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

const data = [
  { type: "image", uri: require("../../images/carousel.jpeg") },
  { type: "image", uri: require("../../images/carousel.jpeg") },
  // Add more images and videos as needed
];

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        {item.type === "image" ? (
          <ImageBackground style={styles.image} source={item.uri}>
            {/* Any additional components or styling for the image */}
          </ImageBackground>
        ) : (
          // Your video component remains the same
          <Video
            style={styles.video}
            source={item.uri}
            resizeMode="cover"
            controls
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 20} // Adjust the itemWidth as needed
        layout={"default"}
        loop
        autoplay
        autoplayInterval={5000} // Set autoplayInterval to your desired auto-scroll interval in milliseconds
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    // position: "absolute",
    // top: 0,
    backgroundColor: "transparent",
  },
  item: {
    width: screenWidth - 20,
    height: 180, // Adjust the height of the item
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  video: {
    flex: 1,
    borderRadius: 8,
  },
});

export default MyCarousel;
