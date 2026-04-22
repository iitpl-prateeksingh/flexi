import API from "../api";

// ✅ SAVE / UPDATE HOMEPAGE
export const saveHomePageService = (formData) => {
    return API.post("/admin/homepage", formData, {
        headers: {
            "Cache-Control": "no-cache"
        }
    });
};

// ✅ GET ADMIN DATA
export const getHomePageAdminService = () => {
    return API.get("/admin/homepage", {
        headers: {
            "Cache-Control": "no-cache"
        }
    });
};

// ✅ GET PUBLIC DATA
export const getHomePagePublicService = () => {
    return API.get("/homepage", {
        headers: {
            "Cache-Control": "no-cache"
        }
    });
};

// ✅ TOGGLE STATUS
export const toggleHomePageStatusService = () => {
    return API.patch("/admin/homepage/status", {}, {
        headers: {
            "Cache-Control": "no-cache"
        }
    });
};