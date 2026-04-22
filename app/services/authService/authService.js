import API from "../api";

export const loginService = (data) => {
    return API.post("/auth/login", data);
};