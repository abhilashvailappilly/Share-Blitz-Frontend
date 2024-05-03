import axios, { AxiosResponse, AxiosError } from "axios";

interface RegisterUserData {
    name: string;
    userName: string;
    email: string;
    mobile: string;
    password: string;
}

export const apiCall = async (method: string, url: string, data: RegisterUserData): Promise<any> => {
    try {
        let response: AxiosResponse<any>;

        if (method === "post") {
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

        return response.data;
    } catch (error) {
        console.log( 'Api call error :',error)
        // if (axios.isAxiosError(error)) {
        //     const axiosError: AxiosError = error;

        //     if (axiosError.response?.status === 403) {
        //         localStorage.setItem(userAuth, "");
        //         localStorage.setItem(refreshToken, "");
        //         clearUser();
        //         window.location.reload("/login");
        //     }

        //     if (axiosError.response?.status === 401) {
        //         try {
        //             const refreshResponse = await refreshAccessToken(axiosError);
        //             return refreshResponse.data;
        //         } catch (refreshError) {
        //             const refreshAxiosError: AxiosError = refreshError;

        //             if (refreshAxiosError.response?.status === 401) {
        //                 clearUser();
        //             } else {
        //                 throw refreshError;
        //             }
        //         }
        //     } else {
        //         throw axiosError.response?.data;
        //     }
        // } else {
        //     throw error;
        // }
    }
};
