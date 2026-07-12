import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token");

    if(token){
        config.headers.authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response, (error) =>{

        const status = error.response?.status;
        const requestUrl = error.response?.config?.url;

        const isAuthRequest = 
        requestUrl?.includes("/auth/login") || requestUrl?.includes("/auth/register");

        if(!isAuthRequest && 
            (status === 401 || status === 403)){
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
)

export default api;