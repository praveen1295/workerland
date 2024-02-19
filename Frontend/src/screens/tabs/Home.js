import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import { useTranslation } from "react-i18next";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location"; // Importing expo-location instead of expo-permissions
import * as ImagePicker from "expo-image-picker";
import Header from "../../common/Header";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Avatar, Icon } from "react-native-elements";
import { localServiceProviders as lsp } from "../../dummy";
import { localServiceProvidersApiCall } from "./logic";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { serviceType } from "../../dummy";
import CommonBtn from "../../common/CommonButton";
import Loading from "../../common/Loader";
import { getData } from "../../utils/storageService";
import MyCarousel from "./Carausel";
import { apiFailureAction } from "../../commonApiLogic.Js";
import { getUserDataApiCall } from "../../utils/getUser";
import DescriptionModal from "../ServiceProviderDetail/DescriptionModal";
import SubcategoryModal from "../Register/SubCategoryModal";
import DropDown from "../../common/DropDown";

const { width, height } = Dimensions.get("window");

const Home = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const { t } = useTranslation();
  // const [maxDistance, setMaxDistance] = useState(12000);
  const [markers, setMarkers] = useState([]);
  const [localServiceProviders, setLocalServiceProviders] = useState([]);
  const [localServiceProvider, setLocalServiceProvider] = useState({
    flag: false,
    details: {},
  });

  const [userType, setUserType] = useState({});
  const [category, setCategory] = useState("");

  const [memberPhoto, setMemberPhoto] = useState([]);
  const [userData, setUserData] = useState({});
  const [description, setDescription] = useState("");

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [selectedRange, setSelectedRange] = useState(12000);

  const { loading } = useSelector((state) => state.localServiceProvidersData);
  const { loading: userLoading } = useSelector((state) => state.userData);

  const areaRangeArray = [
    { label: t("Select-Range-Placeholder"), value: 12000 },
    { label: t("12 KM"), value: 12000 },
    { label: t("15 KM"), value: 15000 },
    { label: t("20 KM"), value: 20000 },
    { label: t("25 KM"), value: 25000 },
    { label: t("50 KM"), value: 50000 },
    { label: t("75 KM"), value: 75000 },
  ];

  const handleInputChange = (text) => {
    setDescription(text);
  };

  const getLocalData = () => {
    console.log(
      "  category,subcategories, selectedRange,",
      category,
      subcategories,
      selectedRange
    );
    dispatch(
      localServiceProvidersApiCall({
        category,
        subcategories,
        maxDistance: selectedRange,
      })
    )
      .unwrap()
      .then(({ data }) => {
        if (data.data.length > 0) {
          setLocalServiceProviders(data.data);
        } else {
          alert("work providers not found");
          setLocalServiceProviders([]);
        }
      })
      .catch((error) => {
        dispatch(apiFailureAction.apiFailure(error));
      });
  };
  const handleSubmit = (isSkip) => {
    if (isSkip) {
      setShowDescriptionModal(false);
    } else {
      setShowDescriptionModal(false);
    }
    navigation.navigate("BookingScreen", {
      localServiceProvider: null,
      category,
      subcategories,
      description,
      maxDistance: selectedRange,
    });
  };

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
          dispatch(apiFailureAction.apiFailure(error));
        });
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  };

  const orderNow = () => {
    if (userData?.aadharPhotoUrl === "" || userData?.profilePhotoUrl === "") {
      alert(
        "Adhaar and Profile image is required for order. Plese upload your Adhaar and Profile image"
      );
      navigation.navigate("ImageUpload", {
        localServiceProvider,
        setShowDescriptionModal,
        getUserData,
        handleSubmit,
      });
      return;
    }
    setShowDescriptionModal(true);
  };

  useEffect(() => {
    getLocalData(category);
  }, [subcategories, selectedRange]);

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

    async function getLocationAsync() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    }

    getLocationAsync();

    // Simulate automatic location updates every 10 seconds
    const intervalId = setInterval(() => {
      getLocationAsync();
    }, 10000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const fetchPhotos = async (url) => {
    try {
      const res = await fetch(url);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);

      setMemberPhoto((prevState) => [...prevState, imageObjectURL]);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    setMemberPhoto([]);
    localServiceProviders?.map((item) => {
      item?.profilePhotoUrl
        ? fetchPhotos("https://csrs.onrender.com/api/v1/static/profile.jpeg")
        : setMemberPhoto((prevState) => [...prevState, "noImg"]);
    });
  }, []);

  const handleMarkerPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      const newMarkers = [
        ...markers,
        { coordinate: location.coords, image: result.uri },
      ];
      setMarkers(newMarkers);
    }
  };

  const handleImgClick = (serviceProvider) => {
    setLocalServiceProvider({ details: serviceProvider, flag: true });
  };

  const moreInf = (localServiceProvider) => {
    navigation.navigate("serviceProviderDetail", { localServiceProvider });
  };

  const onCardPress = (category) => {
    setCategory(category);
    setShowSubcategories(true);
  };

  if (loading || userLoading) {
    return <Loading />;
  }

  console.log("localServiceProviders", localServiceProviders);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0786DAFD" barStyle="light-content" />
      <Header
        // leftIcon={require("../../images/menu1.png")}
        notificationIcon={require("../../images/notificationActive.png")}
        data={userData}
        title={t("Home")}
        onclickRightIcon={() => {
          navigation.navigate("Notifications", { userData });
        }}
        // onclickLeftIcon={() => {
        //   navigation.openDrawer();
        // }}
      />
      <View
        style={{
          position: "absolute",
          top: 70,
          zIndex: 100,
          height: 200,
          backgroundColor: "transparent",
        }}
      >
        <MyCarousel />
      </View>

      {console.log("lacation", location)}

      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            // latitude: location.coords.latitude,
            // longitude: location.coords.longitude,
            latitude: 21.750767046976527,
            longitude: 78.18482381145711,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              // latitude: location.coords.latitude,
              // longitude: location.coords.longitude,
              latitude: 21.750767046976527,
              longitude: 78.18482381145711,
            }}
            title={"Initial Location"}
            description={"Description for initial location"}
          >
            <TouchableOpacity>
              {/* <Image
                source={{
                  uri: "https://via.placeholder.com/150/0000FF/808080?text=Blue+Image",
                }}
                style={styles.markerImage}
              /> */}
              <Icon
                name="dot-circle-o"
                type="font-awesome"
                color="blue"
                style={styles.icon}
                outline
              />
            </TouchableOpacity>
          </Marker>

          {localServiceProviders.map((serviceProvider, idx) => (
            <View key={idx} style={{ backgroundColor: "red" }}>
              <Marker
                coordinate={{
                  latitude: serviceProvider.location.coordinates[0],
                  longitude: serviceProvider.location.coordinates[1],
                }}
                title={serviceProvider.name}
                description={serviceProvider.address}
                onPress={() => handleImgClick(serviceProvider)}
              >
                <TouchableOpacity>
                  {serviceProvider.profilePhotoUrl ? (
                    // <Image
                    //   source={{
                    //     uri: serviceProvider.profilePhotoUrl,
                    //   }}
                    //   style={styles.markerImage}
                    // />
                    <Avatar
                      rounded
                      size={"large"}
                      source={{
                        uri: serviceProvider.profilePhotoUrl,
                      }}
                    />
                  ) : (
                    <Icon
                      name="user-circle-o"
                      type="font-awesome"
                      color="#9E9E9E"
                      size={60}
                      style={{ borderRadius: 60 }}
                    />
                    // <Image
                    //   source={require("../../images/profileIcon.png")}
                    //   style={styles.markerImage}
                    // />
                  )}
                </TouchableOpacity>
              </Marker>
            </View>

            // <Marker
            //   key={idx}
            //   coordinate={{
            //     latitude: 37.78825,
            //     longitude: -122.4324,
            //   }}
            //   title="Test Marker"
            //   description="This is a test marker"
            // >
            //   <TouchableOpacity>
            //     <Image
            //       source={{
            //         uri: "https://via.placeholder.com/150/FF0000/FFFFFF/?text=Red",
            //       }}
            //       style={styles.markerImage}
            //     />
            //   </TouchableOpacity>
            // </Marker>
          ))}
        </MapView>
      )}

      <View>
        {localServiceProvider.flag ? (
          <View style={styles.serviceProviderInfoContainer}>
            <View style={styles.serviceProviderInfoContainer2}>
              <Avatar
                rounded
                size={"large"}
                source={{
                  uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                }}
              />

              <View style={styles.serviceProviderInfo}>
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "700" }}>
                    {localServiceProvider?.details?.name}
                  </Text>
                  <Text style={styles.details}>
                    {localServiceProvider?.details?.category}
                  </Text>
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
                    {localServiceProvider?.details?.address}
                  </Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Image
                    source={require("../../images/distanceIcon.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.details}>
                    {localServiceProvider?.details?.distance / 1000} km
                  </Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Icon
                    name="star"
                    type="font-awesome"
                    color="yellow"
                    style={styles.icon}
                    outline
                  />
                  <Text>{localServiceProvider?.details?.averageRating}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() =>
                  setLocalServiceProvider({
                    ...localServiceProvider,
                    flag: false,
                  })
                }
              >
                <Ionicons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <CommonBtn
              title={t("More-Information")}
              bgColor={"#263E57"}
              handleClick={() => moreInf(localServiceProvider)}
            />
          </View>
        ) : (
          <View
            style={{
              position: "absolute",
              bottom: 70,
              alignItems: "center",
              // backgroundColor: "red",
            }}
          >
            <View
              style={{
                alignItems: "flex-end",
                // backgroundColor: "red",
                width: width,
              }}
            >
              <DropDown
                setCurrentValue={setSelectedRange}
                // setShowSubcategories={setShowSubcategories}
                currentValue={selectedRange}
                items={areaRangeArray}
                placeholder={"Select-Range-placeholder"}
                backgroundColor={"#fff"}
                width={150}
                marginBottom={0}
                marginRight={20}
              />
            </View>
            <View style={styles.cardsContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.sliderContainer}
              >
                {serviceType.map((item) => (
                  <Card onPress={onCardPress} item={item} />
                ))}
              </ScrollView>
            </View>
            {category &&
              subcategories.length > 0 &&
              selectedRange &&
              localServiceProviders.length > 0 && (
                <CommonBtn
                  title={t("Book-Service")}
                  bgColor={"#000000"}
                  handleClick={orderNow}
                />
              )}
          </View>
        )}
      </View>
      {showDescriptionModal && (
        <DescriptionModal
          handleSubmit={handleSubmit}
          setShowDescriptionModal={setShowDescriptionModal}
          handleInputChange={handleInputChange}
          showDescriptionModal={showDescriptionModal}
          description={description}
        />
      )}
      {showSubcategories && (
        <SubcategoryModal
          category={category}
          setShowSubcategories={setShowSubcategories}
          setSubcategories={setSubcategories}
          subcategories={subcategories}
          showSubcategories={showSubcategories}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    // position: "absolute",
    // bottom: 85,
    right: 0,
    width: width,
    height: 150,
    overflow: "scroll",
    gap: 40,
  },

  serviceProviderInfoContainer: {
    position: "absolute",
    bottom: 70,
    height: 350,
    width: width,
    paddingTop: 34,
    paddingHorizontal: 0,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    // justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },

  serviceProviderInfoContainer2: {
    flexDirection: "row",
    gap: 25,
  },

  closeButton: {
    position: "absolute",
    top: -20,
    right: -14,
  },

  serviceProviderInfo: {
    gap: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  details: {
    fontWeight: "400",
    color: "#9E9E9E",
    flexWrap: "wrap",
    width: 155,
  },
  icon: {
    width: 25,
    height: 25,
  },
  sliderContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});

export default Home;
