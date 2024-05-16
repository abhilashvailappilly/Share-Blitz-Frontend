import axios, { AxiosResponse, AxiosError } from "axios";
import {api as API} from '../../Service/axios'
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/constants/url";



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
console.log('api call',response.data)
        return response;
    } catch (error) {
        console.log( 'Api call error :',error)
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            if (axiosError.response?.status === 409) {
                toast.error(error?.response?.data?.message)
                
                    //    toast.error(axiosError)
             }

     
        } else {
            throw error;
        }
    }
};
