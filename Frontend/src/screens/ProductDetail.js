import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Header from "../common/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuthHeader } from "../utils/sessionManagement";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../utils/storageService";

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    image: ProductImg,
    title: productTitle,
    description,
    price,
  } = route.params.data;

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require("../images/back.png")}
        rightIcon={require("../images/cart.png")}
        title={"Product Detail"}
        onclickLeftIcon={() => {
          navigation.goBack();
        }}
      />

      <Image source={{ uri: ProductImg }} style={styles.productImg} />
      <Text style={styles.productTitle}>{productTitle}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.price, { color: "#000" }]}>Price:</Text>
        <Text style={styles.price}>$ {price}</Text>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImg: {
    width: "100%",
    height: 380,
    resizeMode: "center",
  },
  productTitle: {
    fontSize: 23,
    color: "#000",
    fontWeight: "600",
    marginTop: 20,
    marginLeft: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  price: {
    color: "green",
    marginLeft: 20,
    marginTop: 20,
    fontSize: 28,
    fontWeight: "800",
  },
});
