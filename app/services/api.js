import axios from "axios";

// ✅ create instance
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
});

// ================================
// ✅ REQUEST INTERCEPTOR
// ================================
API.interceptors.request.use((config) => {
    config.headers = config.headers || {};

    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token && token !== "undefined" && token !== "null") {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    console.log("toek")

    return config;
});
// ================================
// ✅ RESPONSE INTERCEPTOR
// ================================
API.interceptors.response.use(
    (response) => {
        console.log(
            `%c✅ RESPONSE: ${response.status} ${response.config.url}`,
            "color: blue; font-weight: bold;"
        );

        // ✅ return full response OR data (choose one)
        return response.data;
    },
    (error) => {
        console.error(
            `%c❌ API ERROR: ${error.response?.status} ${error.config?.url}`,
            "color: red; font-weight: bold;"
        );

        console.error("🔴 Error Data:", error.response?.data);

        // ✅ AUTO LOGOUT ON 401


        return Promise.reject(error.response?.data || error.message);
    }
);

export default API;