import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getUserDataApiCall } from "../AdminOrder/logic";
import Loading from "../Loading";
import { clearSession } from "../../utils/sessionManagement";
import { apiFailureAction } from "../../commonApiLogic.Js";
import { useTranslation } from "react-i18next";

const moreData = [
  "My-Account",
  "Wallet",
  "Wishlist",
  "Setting",
  "Address",
  "Payment-Method",
  "Find-The-Nearest",
  "My-Orders",
  "My-Availability",
];

const serviceProviderVisibility = ["Address", "My-Availability"];

const More = ({ setSelectedTab }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const [userType, setUserType] = useState({});

  const handlePress = (item) => {
    switch (item) {
      case "My-Account":
        setSelectedTab(3);
        break;

      case "Wallet":
        navigation.navigate("WalletScreen");
        break;

      case "Wishlist":
        navigation.navigate("WishlistScreen");
        break;

      case "Setting":
        navigation.navigate("SettingScreen");
        break;

      case "Address":
        navigation.navigate("AddressScreen");
        break;

      case "Payment-Method":
        navigation.navigate("PaymentMethodScreen");
        break;

      case "Fin-The-Nearest":
        setSelectedTab(1);
        navigation.navigate("FindNearestScreen");
        break;

      case "My-Orders": {
        if (userData?.isAdmin) {
          navigation.navigate("AdminOrder", { userData });
        } else {
          navigation.navigate("MyOrders", { userData });
        }
        break;
      }
      case "My-Availability":
        navigation.navigate("MyAvailability", { userData });
        break;
      // case "Logout": {
      //   clearSession();
      //   alert("Logged out successfully");
      //   navigation.navigate("Login");
      //   break;
      // }
      default:
        // navigation.navigate("AdminOrder");
        break;
    }
  };

  const getUserData = async () => {
    // const jwtToken = await getData(`token`);
    setLoading(true);
    try {
      // const decodedToken = jwtDecode(jwtToken);
      dispatch(getUserDataApiCall({}))
        .then((res) => {
          setUserData(res.payload.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      dispatch(apiFailureAction.apiFailure(error));
    }
  };

  useEffect(() => {
    const getUserType = async () => {
      const isServiceProvider = await getData("isServiceProvider");
      const isAdmin = await getData("isAdmin");

      if (isServiceProvider) {
        setUserType({ ...userType, serviceProvider: isServiceProvider });
      } else if (isAdmin) {
        setUserType({ ...userType, admin: isAdmin });
      }
    };
    getUserType();

    getUserData();
  }, []);

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
      <StatusBar backgroundColor="#0786DAFD" barStyle="light-content" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header
            leftIcon={require("../../images/backBtn.png")}
            rightIcon={require("../../images/notification.svg")}
            title={t("More")}
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

export default More;
