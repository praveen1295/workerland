import { deleteData, getData, setData } from "./storageService";

export const clearSession = () => {
  deleteData();
};

export const addSession = (session) => {
  setData("isLoggedIn", true);
  setData("isServiceProvider", session.isServiceProvider);
  setData("isAdmin", session.isAdmin);
  setData(`token`, session.token);
  // setData("publicAddress", session.address);
};

export const checkIfLogin = async () => (await getData("isLoggedIn")) || false;

export const getAuthHeader = async () => await getData("token");
