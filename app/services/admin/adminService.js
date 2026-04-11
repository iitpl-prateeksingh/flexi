import API from "../api";

export const getAdminsService = () => {
    return API.get("/admin");
};

export const createAdminService = (data) => {
    return API.post("/admin/create", data);
};

export const updateAdminStatusService = (adminId, status) => {
    return API.patch(`/admin/${adminId}/status`, { status });
};
// UPDATE DETAILS
export const updateAdminService = (id, data) => {

    return API.patch(`/admin/${id}`, data);
}

export const deleteAdminUser = (id) => {
    return API.delete(`/admin/${id}`)
}