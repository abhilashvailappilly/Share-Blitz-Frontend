import axios from "axios";
import { userAuthToken } from "../utils/constants/localStorage";
import { BASE_URL } from "../utils/constants/url";

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});
// const user = JSON.parse(localStorage.getItem('user'));

api.interceptors.request.use(
  async (config) => {
    const token =JSON.parse(localStorage.getItem(userAuthToken) as string)
    config.headers["Authorization"] = token
    // config.headers["Authorization"] = `Bearer ${token}`
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);