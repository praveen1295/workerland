import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useDispatch } from "react-redux";
import { localServiceProvidersApiCall } from "./logic";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Header from "../../common/Header";

const Search = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [searchStr, setSearchStr] = useState("");
  const [serviceProviders, setServiceProviders] = useState([]);

  const handleSearch = () => {
    const category = {
      category: [searchStr],
    };
    getLocalData(category);
  };

  const getLocalData = (category) => {
    dispatch(localServiceProvidersApiCall({ searchStr }))
      .unwrap()
      .then(({ data }) => {
        setServiceProviders(data.data);
        // setLocalServiceProviders(data.data);
      })
      .catch((error) => {
        const serializableError = {
          message: error.message,
          // You can include other serializable properties if needed
        };
        dispatch(apiFailureAction.apiFailure(serializableError));
      });
  };

  // useEffect(() => {
  // }, [category, dispatch]);

  const renderItems = ({ item, index }) => {
    const userId = item?.userId; // Extract userId from item
    return (
      <View key={index}>
        <View style={styles.itemContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {item.profilePhotoUrl ? (
              <Avatar
                rounded
                size={"small"}
                source={{
                  uri: item.profilePhotoUrl,
                }}
              />
            ) : (
              <Avatar
                rounded
                size={"large"}
                source={require("../../images/profileIcon.png")}
              />
            )}

            <View>
              <Text style={styles.headingText}>{item?.name}</Text>
              <Text style={styles.subHeadingText}>{item?.name}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
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
            {/* <Image source={require("../../images/rightArrow.png")} /> */}

            <Text
              // checked={pendingRequestsSelectedArray.includes(userId)}
              // onPress={() => checkboxClick(userId)}
              style={{ marginLeft: 10, fontWeight: "500" }}
            >
              {Math.floor(item.distance / 1000)} KM
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0786DAFD" barStyle="light-content" />
      <Header
        leftIcon={require("../../images/backBtn.png")}
        // rightIcon={require("../../images/headerStar.png")}
        // rightIcon2={require("../../images/headerMessage.png")}
        title={t("Search")}
        onclickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <View style={{ padding: 20, paddingTop: 24 }}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              padding: 10,
            }}
            placeholder={t("Enter-search-query")}
            onChangeText={(text) => setSearchStr(text)}
            value={searchStr}
          />
          <Button title={t("Search")} onPress={handleSearch} />
        </View>

        {serviceProviders.length > 0 && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              {t("Service-Providers")}:
            </Text>
            <FlatList
              data={serviceProviders}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderItems}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  headingText: {
    fontWeight: "600",
    fontSize: 17,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
export default Search;
