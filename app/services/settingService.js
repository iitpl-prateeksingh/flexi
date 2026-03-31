import API from "./api";

// ✅ GET (ADMIN)
export const getSettingsService = () => {
    return API.get("/admin/settings", {
        headers: {
            "Cache-Control": "no-cache"
        }
    });
};

// ✅ SAVE (CREATE / UPDATE)
export const saveSettingsService = (data) => {
    return API.post("/admin/settings", data);
};

// ✅ TOGGLE STATUS
export const toggleSettingsStatusService = (status) => {
    return API.patch("/admin/settings/status", { status });
};