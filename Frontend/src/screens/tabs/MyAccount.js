import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import Header from "../../common/Header";
import { Avatar, Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommonBtn from "../../common/CommonButton";
import { useTranslation } from "react-i18next";
import LanguageModal from "../../common/LanguageModal";
import i18next, { languageResources } from "../../utils/services/i18next";
import { getLng, setLng } from "../../utils/storageService";

const { width, height } = Dimensions.get("window");

const MyAccount = ({ userData: user, getUserData }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  // const { localServiceProvider } = route.params;
  const [language, setLanguage] = useState("");
  const [langModalVisible, setLangModalVisible] = useState();
  const orderNow = () => {};
  const callNow = () => {};

  const Information = ["Location", "Order-History", "Language"];

  const editProfile = () => {
    navigation.navigate("EditProfile", { userData: user, getUserData });
  };

  const handlePress = (item) => {
    switch (item) {
      case "Location":
        break;
      case "Order-History": {
        if (user?.isAdmin) {
          navigation.navigate("AdminOrder", { userData: user });
        } else {
          navigation.navigate("MyOrders", { userData: user });
        }
        break;
      }
      case "Language": {
        setLangModalVisible(true);
        break;
      }

      default:
        break;
    }
  };

  const changeLng = (lng) => {
    if (lng) {
      i18next.changeLanguage(lng);
      setLng(lng);
    } else {
      i18next.changeLanguage("en");
      setLng("en");
    }

    // setVisible(false);
  };

  const onSelectLang = (selectedLang) => {
    changeLng(selectedLang);
    setLanguage(selectedLang);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePress(item)}
    >
      <Text style={styles.itemText}>{t(item)}</Text>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
      >
        {/* <Text
          style={{
            width: 30,
            height: 20,
            borderRadius: 30,
            backgroundColor: item === "Incomplete" ? "green" : "#263E57",
            textAlign: "center",
            color: "#fff",
          }}
        >
          2
        </Text> */}
        <Image source={require("../../images/rightArrow.png")} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0786DAFD" barStyle="light-content" />
      <Header
        leftIcon={require("../../images/backBtn.png")}
        // rightIcon={require("../../images/headerStar.png")}
        // rightIcon2={require("../../images/headerMessage.png")}
        rightText={t("Edit")}
        title={t("My-Account")}
        onclickLeftIcon={() => {
          navigation.goBack();
        }}
        onclickRightText={editProfile}
      />
      <View style={styles.detailContainer}>
        <View style={styles.userInfoContainer}>
          {user.profilePhotoUrl ? (
            <Avatar
              rounded
              size={"large"}
              source={{
                uri: user.profilePhotoUrl,
              }}
            />
          ) : (
            <Avatar
              rounded
              size={"large"}
              source={require("../../images/profileIcon.png")}
            />
          )}

          <View style={styles.userInfo}>
            <View style={styles.detailsContainer}>
              <Icon
                name="user"
                type="font-awesome"
                color="#9E9E9E"
                style={styles.icon}
                outline
              />
              <Text style={styles.details}>{user.name}</Text>
            </View>

            <View style={styles.detailsContainer}>
              <Icon
                name="map-marker"
                type="font-awesome"
                color="#9E9E9E"
                style={styles.icon}
                outline
              />
              <Text style={styles.details}>
                {user.address.split(",").join(" ")}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: 62,
            backgroundColor: "#EFEFF4",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            borderRadius: 15,
          }}
        >
          <Text style={styles.itemText}>{t("Description")}</Text>
          <TouchableOpacity>
            <Text style={styles.itemText}>{t("More")}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headingText}>{t("Information")}</Text>
        <FlatList
          data={Information}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* <View> */}
        <Text style={styles.headingText}>{t("Payments")}</Text>
        {/* <View style={styles.userInfo}>
          <TouchableOpacity
            style={[
              styles.detailsContainer,
              { ...styles.cardDetailsContainer },
            ]}
          >
            <Icon
              name="credit-card"
              type="font-awesome"
              color="#9E9E9E"
              style={styles.icon}
            />
            <View>
              <Text style={styles.cardHeading}>{user.name}</Text>
              <Text style={styles.cardSubHeading}>{"48....1562"}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.detailsContainer,
              { ...styles.cardDetailsContainer },
            ]}
          >
            <Icon
              name="plus-circle"
              type="font-awesome"
              color="#9E9E9E"
              size={30}
              style={styles.icon}
            />
            <Text style={styles.cardHeading}>{t("New Card")}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      {/* </View> */}
      {langModalVisible && (
        <LanguageModal
          setLangModalVisible={setLangModalVisible}
          langModalVisible={langModalVisible}
          onSelectLang={onSelectLang}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    gap: 20,
    width: width,
    backgroundColor: "#fff",
    padding: 20,
  },

  userInfoContainer: {
    flexDirection: "row",
    gap: 25,
  },
  userInfo: {
    gap: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  details: {
    fontSize: 17,
    fontWeight: "400",
    color: "#000000",
    width: 200,
  },
  icon: {
    width: 25,
    height: 25,
  },

  cardDetailsContainer: {
    gap: 16,
  },

  headingText: {
    textAlign: "left",
    fontSize: 22,
    fontWeight: "700",
  },
  itemText: {
    fontSize: 17,
    fontWeight: "400",
    color: "#000000",
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  cardHeading: {
    fontSize: 17,
    fontWeight: "600",
  },
  cardSubHeading: {
    fontSize: 12,
    fontWeight: "400",
    opacity: 0.7,
  },
});

export default MyAccount;
