let authToken = null;

// ✅ set token
export const setToken = (token) => {
    authToken = token;

    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
    }
};

// ✅ get token
export const getToken = () => {
    if (authToken) return authToken;

    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }

    return null;
};

// ✅ remove token
export const removeToken = () => {
    authToken = null;

    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
};