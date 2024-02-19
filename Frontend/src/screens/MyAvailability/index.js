import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MyDatePicker from "../Calender";
import { useRoute } from "@react-navigation/native";

import { useDispatch } from "react-redux";
import Loading from "../Loading";
import { getServiceProviderInfoApiCall } from "../../utils/getServiceProviderInfo";

const MyAvailability = ({}) => {
  const route = useRoute();
  const { userData } = route.params;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [serviceProviderInfo, setServiceProviderInfo] = useState({});

  const getServiceProviderInfo = async () => {
    setLoading(true);
    try {
      dispatch(getServiceProviderInfoApiCall({}))
        .then((res) => {
          setServiceProviderInfo(res.payload.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getServiceProviderInfo();
  }, []);

  console.warn("serviceProvider", serviceProviderInfo);
  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <MyDatePicker
        localServiceProvider={serviceProviderInfo}
        myAvailability={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyAvailability;
