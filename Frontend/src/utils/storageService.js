import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @description This function set data to desired storage
 * @param {string} keyName
 * @param {Object} value
 * @returns void
 */
export const setData = (keyName, value) => {
  AsyncStorage.setItem(keyName, JSON.stringify(value));
};
/**
 * @description This function delete all data from desired storage
 * @returns {void} void
 */
// export const deleteData = () => {
//   AsyncStorage.clear();
// };
export const deleteData = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("isLoggedIn");

    // Alternatively, if you want to clear all data
    // await AsyncStorage.clear();
  } catch (error) {
    console.error("Error deleting data:", error);
    // Handle the error as needed, maybe log it or show a user-friendly message
  }
};
/**
 * @description This function get data from desired storage
 * @param {string} keyName
 * @returns {Object} value
 */
export const getData = async (keyName) => {
  let data = null;
  try {
    const storageData = await AsyncStorage.getItem(keyName);
    if (storageData) {
      data = JSON.parse(storageData);
    } else {
      deleteData();
    }
  } catch (error) {
    deleteData();
    // location.reload();
  }
  return data;
};

export const setLng = (data) => {
  data = JSON.stringify(data);
  return AsyncStorage.setItem("language", data);
};

export const getLng = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("language").then((data) => {
      resolve(JSON.parse(data));
    });
  });
};
