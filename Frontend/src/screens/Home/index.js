import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SvgUri } from "react-native-svg";
import Header from "../../common/Header";
import Home from "../tabs/Home";
import Search from "../tabs/Search";
import Wishlist from "../tabs/Wishlist";
import More from "../tabs/More";
import AdminMyAccount from "../tabs/AdminMyAccount";
import MyAccount from "../tabs/MyAccount";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataApiCall } from "../../utils/getUser";
import { apiFailureAction } from "../../commonApiLogic";
import Loading from "../Loading";
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [userData, setUserData] = useState({});

  const { loading } = useSelector((state) => state.userData);

  const getUserData = async () => {
    // const jwtToken = await getData(`token`);
    try {
      // const decodedToken = jwtDecode(jwtToken);
      dispatch(getUserDataApiCall({}))
        .then((res) => {
          setUserData(res.payload.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      dispatch(apiFailureAction.apiFailure(error));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  console.log("userDAta****", userData);

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      {selectedTab === 0 ? (
        <Home />
      ) : selectedTab === 1 ? (
        <Search />
      ) : selectedTab === 2 ? (
        <Wishlist />
      ) : selectedTab === 3 ? (
        userData.isAdmin ? (
          <AdminMyAccount userData={userData} getUserData={getUserData} />
        ) : (
          <MyAccount userData={userData} getUserData={getUserData} />
        )
      ) : (
        <More setSelectedTab={setSelectedTab} />
      )}

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(0)}
        >
          <Image
            width={24}
            height={24}
            source={
              selectedTab === 0
                ? require("../../images/homeActive.png")
                : require("../../images/home.png")
            }
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(1)}
        >
          <Image
            source={
              selectedTab === 1
                ? require("../../images/searchActive.png")
                : require("../../images/search.png")
            }
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(2)}
        >
          <Image
            source={
              selectedTab === 2
                ? require("../../images/walletActive.png")
                : require("../../images/wallet.png")
            }
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => setSelectedTab(3)}
        >
          <Image
            source={
              selectedTab === 3
                ? require("../../images/myAccountActive.png")
                : require("../../images/myAccount.png")
            }
            style={styles.bottomTabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomTab}
          onPress={() => {
            setSelectedTab(4);
            // navigation.openDrawer();
          }}
        >
          <Image
            width="5"
            height="5"
            source={
              selectedTab === 4
                ? require("../../images/moreActive.png")
                : require("../../images/more.png")
            }
            // style={styles.bottomTabIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bottomTab: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
});
