import axios from "axios";
import { BACKEND_URL } from "@env";
import { getAuthHeader } from "./sessionManagement";
import { getData } from "./storageService";

const apiClient = axios.create({
  baseURL: BACKEND_URL || "https://csrs.onrender.com/api/v1",
  withCredentials: true,
});

export const setHeader = (token) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const discardHeader = () => {
  delete apiClient.defaults.headers.common["Authorization"];
};

export const fetchToken = async () => {
  const token = await getAuthHeader();

  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.error("Token is undefined or null");
  }
};

fetchToken();

export default apiClient;
