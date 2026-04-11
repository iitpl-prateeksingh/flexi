import API from "../api";

// ✅ SAVE / UPDATE ABOUT PAGE
export const saveAboutPageService = (formData) => {
    return API.post("/admin/about", formData, {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

// ✅ GET ADMIN DATA
export const getAboutPageAdminService = () => {
    return API.get("/admin/about", {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

// ✅ GET PUBLIC DATA
export const getAboutPagePublicService = () => {
    return API.get("/about", {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

// ✅ TOGGLE STATUS
export const toggleAboutPageStatusService = () => {
    return API.patch("/admin/about/status", {}, {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};