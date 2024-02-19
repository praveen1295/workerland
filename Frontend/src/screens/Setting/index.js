import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import RNRestart from "react-native-restart";
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import i18next, { languageResources } from "../../utils/services/i18next";

import languagesList from "../../utils/services/languagesList.json";

import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getUserDataApiCall } from "../AdminOrder/logic";
import Loading from "../Loading";
import { clearSession } from "../../utils/sessionManagement";
import { apiFailureAction } from "../../commonApiLogic.Js";
import LanguageModal from "../../common/LanguageModal";
import { setLng } from "../../utils/storageService";

const moreData = ["Logout", "Language"];

const serviceProviderVisibility = ["Address", "My Availability"];

const Setting = ({ setSelectedTab }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const [userType, setUserType] = useState({});
  const [langModalVisible, setLangModalVisible] = useState();
  const [language, setLanguage] = useState("");
  const { t } = useTranslation();

  console.log("language", language);

  const handlePress = (item) => {
    switch (item) {
      case "Logout": {
        clearSession();
        alert("Logged out successfully");
        navigation.navigate("Login");
        // RNRestart.restart();
        break;
      }
      case "Language": {
        setLangModalVisible(true);
      }
      default:
        // navigation.navigate("AdminOrder");
        break;
    }
  };

  const changeLng = (lng) => {
    setLng(lng);
    i18next.changeLanguage(lng);
    // setVisible(false);
  };

  const onSelectLang = (selectedLang) => {
    changeLng(selectedLang);

    setLanguage(selectedLang);
  };

  const renderItem = ({ item }) => {
    if (
      serviceProviderVisibility.includes(item) &&
      !userData.isServiceProvider
    ) {
      return;
    }
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handlePress(item)}
      >
        <View style={styles.listItem}>
          <Text style={styles.itemText}>{t(item)}</Text>
          <Image source={require("../../images/rightArrow.png")} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <>
        <Header
          leftIcon={require("../../images/backBtn.png")}
          rightIcon={require("../../images/notification.svg")}
          title={t("Setting")}
          onclickLeftIcon={() => {
            // navigation.openDrawer();
            navigation.goBack();
          }}
        />

        <View style={styles.listContainer}>
          <FlatList
            data={moreData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </>
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
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    fontWeight: "600",
    fontSize: 17,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Setting;
