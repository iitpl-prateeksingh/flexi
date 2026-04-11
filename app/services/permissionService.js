// services/permissionService.js

import API from "./api";


export const getPermissionsService = (role) => {
    return API.get(`/admin/permissions?role=${role}`, {
        headers: {
            "Cache-Control": "no-cache"
        }
    });
};
// UPDATE PERMISSIONS
export const updatePermissionsService = (data) => {
    return API.post("/admin/roles/permissions", data);
};