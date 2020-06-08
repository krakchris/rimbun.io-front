import axios from "axios";
import * as auth from "./lib/token";

const configData = {
  baseURLApi: process.env.REACT_APP_BASE_URL_API
};

export const setApiHeaders = () => {
  axios.defaults.baseURL = configData.baseURLApi;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  const token = auth.getToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    return true
  }
  return false;
}


export default configData;