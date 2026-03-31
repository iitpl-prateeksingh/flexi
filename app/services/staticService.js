import API from "./api";

// ✅ GET ADMIN PAGE
export const getStaticPageService = (pageType) => {
    return API.get(`/admin/static/${pageType}`);
};

// ✅ CREATE / UPDATE
export const saveStaticPageService = (data) => {
    return API.post("/admin/static", data);
};

// ✅ TOGGLE STATUS (optional)
export const toggleStaticPageStatusService = (pageType, status) => {
    return API.patch(`/admin/static/${pageType}/status`, { status });
};