import axios, { AxiosResponse, AxiosError } from "axios";
import {api as API} from '../../Service/axios'
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constants/url";
// import {persistor} from '../../Store/store'
interface RegisterUserData {
    name: string;
    userName: string;
    email: string;
    mobile: string;
    password: string;
}
interface ErrorResponse {
    message: string;
    [key: string]: any;
}
export const clearUser = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userAuthToken')
    window.location.href="/login";
  };

export const apiCall = async (method: string, url: string, data: any,header:any): Promise<any> => {
    try {
        let response: AxiosResponse<any>;
        console.log('api call ',url , data)
        if (method === "post") {
            if(header)
                response = await axios.post(`${BASE_URL}${url}`,data,{headers:header})
            else
            response = await API.post(url, data);
     
        } else if (method === "get") {
            
            response = await API.get(url, { params: data });
        } else if (method === "patch") {
            response = await API.patch(url, data);
        } else if (method === "delete") {
            response = await API.delete(url, { data });
        } else if (method === "put") {
            response = await API.put(url, data);
        } else {
            throw new Error("Unsupported HTTP method");
        }
        console.log('api call response',response.data)
        return response;
    } catch (error) {
        console.log('API call error:', error);

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          if (axiosError.response) {
            const { status, data } = axiosError.response;
    
            switch (status) {
              case 400:
                toast.error(data?.message || 'Unauthorized access');
                break;
              case 401:
                toast.error(data?.message || 'Unauthorized access');
                clearUser();
                break;
              case 403:
                toast.error(data?.message || 'Forbidden access');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('userAuthToken');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                clearUser();
                break;
              case 409:
                toast.error(data?.message || 'Conflict error');
                break;
              default:
                toast.error(data?.message || 'An error occurred');
            }
          } else {
            toast.error('Network error or no response');
          }
        } else {
          toast.error('An unexpected error occurred');
          throw error; // Rethrow if it's not an Axios error
         }
    }   
};
