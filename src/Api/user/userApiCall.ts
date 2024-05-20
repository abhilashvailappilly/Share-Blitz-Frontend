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
 
export const clearUser = () => {
        toast.error('clr usr')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userAuthToken')
    // persistor.purge();
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
        console.log( 'Api call error :',error)
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            console.log('error',error)
            if (axiosError.response?.status === 409) {
                toast.error(error?.response?.data?.message)
               
             }
             if(axiosError.response?.status === 403){
                toast.error( error?.response?.data?.message)
                localStorage.removeItem('userInfo')
                localStorage.removeItem('userAuthToken')
                clearUser()
                // let dispatch = useDispatch()
                // let navigate = useNavigate()
                // dispatch(logout())
                // navigate('/login')
             }
             if(axiosError.response?.status === 401){

                toast.error( error?.response?.data?.message)
                clearUser()
             }

     
      
        } else {
            throw error;
        }
    }
};
