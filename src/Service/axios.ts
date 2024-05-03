import axios from "axios";
import { userAuth } from "../utils/constants/localStorage";
import { BASE_URL } from "../utils/constants/url";

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use(
  async (config) => {
    config.headers["Authorization"] = localStorage.getItem(userAuth);
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);