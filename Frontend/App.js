import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";
import AppNavigator from "./src/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { getLng, setLng } from "./src/utils/storageService";
import i18next, { languageResources } from "./src/utils/services/i18next";
import Loader from "./src/common/Loader";
import LanguageModal from "./src/common/LanguageModal";
import { StatusBar } from "react-native";

export default function App() {
  const [loginState, setLoginState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [langModalVisible, setLangModalVisible] = useState();

  const changeLng = (lng) => {
    setLng(lng);
    i18next.changeLanguage(lng);
    // setVisible(false);
  };

  const onSelectLang = (selectedLang) => {
    changeLng(selectedLang);

    // setLanguage(selectedLang);
  };

  const selectedLng = async () => {
    setLoading(true);
    const lngData = await getLng();
    if (!!lngData) {
      i18next.changeLanguage(lngData);
    } else {
      setLangModalVisible(true);
    }
    setLoading(false);
    console.log("selected Language data==>>>", lngData);
  };

  useEffect(() => {
    selectedLng();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#263E57" barStyle="light-content" />
      <AppNavigator loginState={loginState} setLoginState={setLoginState} />
      {langModalVisible && (
        <LanguageModal
          setLangModalVisible={setLangModalVisible}
          langModalVisible={langModalVisible}
          onSelectLang={onSelectLang}
        />
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
