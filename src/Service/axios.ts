import axios from "axios";
import { accessToken} from "../utils/constants/localStorage";
import { BASE_URL } from "../utils/constants/url";
import { toast } from "react-toastify";
import { RefreshAccessToken } from "../Api/user/authApiMethod";


export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use(
  async (config) => {
            const token =JSON.parse(localStorage.getItem(accessToken) as string)
             config.headers.authorization = `Bearer ${token}`;

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);



api.interceptors.response.use(
 
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        if (error.response.data.message === "User is blocked") {
          // await logoutUser();
          // toast.dismiss();
          toast.error(
            "Your account has been blocked. Please contact admin.",
            
          );
          // store.dispatch(logout());
        }
        const refresh = await RefreshAccessToken();
        const {accessToken,refreshToken} = refresh.data
        localStorage.setItem('accessToken', JSON.stringify(accessToken))
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
        originalRequest.headers.authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);



////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
export const ApiAdmin = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// ApiAdmin.interceptors.request.use(
//   async (config) => {
//     const token =JSON.parse(localStorage.getItem(adminAuthToken) as string)
//     config.headers["Authorization"] = token
//     // config.headers["Authorization"] = `Bearer ${token}`
//     return config;
//   },
//   async (error) => {
//     return Promise.reject(error);
//   }
// );
ApiAdmin.interceptors.request.use(
  async (config) => {
            const token =JSON.parse(localStorage.getItem(accessToken) as string)
             config.headers.authorization = `Bearer ${token}`;

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);


ApiAdmin.interceptors.response.use(
 
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        if (error.response.data.message === "User is blocked") {
          // await logoutUser();
          // toast.dismiss();
          toast.error(
            "Your account has been blocked. Please contact admin.",
            
          );
          // store.dispatch(logout());
        }
        const refresh = await RefreshAccessToken();
        const {accessToken,refreshToken} = refresh.data
        localStorage.setItem('accessToken', JSON.stringify(accessToken))
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
        originalRequest.headers.authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);