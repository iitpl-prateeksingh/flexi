import API from "./api";

// ================= CREATE =================
export const createServiceApi = (data) => {
    return API.post("/services", data);
};

// ================= GET ALL =================
export const getAllServicesApi = () => {
    return API.get("/services", {
        headers: {
            "Cache-Control": "no-cache"
        }
    });
};
export const getPublicServices = () => {
    return API.get("/services/public", {
        headers: {
            "Cache-Control": "no-cache"
        }
    });
};



// ================= GET SINGLE =================
export const getServiceByIdApi = (id) => {
    return API.get(`/services/${id}`);
};

// ================= UPDATE =================
export const updateServiceApi = (id, data) => {
    return API.put(`/services/${id}`, data);
};

// ================= DELETE =================
export const deleteServiceApi = (id) => {
    return API.delete(`/services/${id}`);
};