import API from "../api";

// ✅ SAVE / UPDATE CONTACT PAGE
export const saveContactPageService = (formData) => {
    return API.post("/contact", formData, {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

// ✅ GET ADMIN DATA
export const getContactPageAdminService = () => {
    return API.get("/contact", {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

// ✅ GET PUBLIC DATA
export const getContactPagePublicService = () => {
    return API.get("/contact", {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

// ✅ TOGGLE STATUS
export const toggleContactPageStatusService = () => {
    return API.patch(
        "/contact/status",
        {},
        {
            headers: {
                "Cache-Control": "no-cache",
            },
        }
    );
};