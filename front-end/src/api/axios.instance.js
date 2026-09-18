import axios from "axios";
import router from "../routes/router";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: VITE_API_BASE_URL,
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error("Request error:", error.response);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error("Response error:", error.response);

        if (error.response && error.response.status === 401) {
            localStorage.removeItem("accessToken");
            router.navigate("/login");
        }
        return Promise.reject(error);
    }
);

export default api;
