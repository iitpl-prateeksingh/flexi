import API from "./api";

// ✅ CREATE BLOG
export const createBlogService = (data) => {
    return API.post("/blog", data);
};

// ✅ GET ALL BLOGS (ADMIN)
export const getBlogsService = (params) => {
    return API.get("/blog", {
        params,
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

// ✅ GET PUBLIC BLOGS (ONLY PUBLISHED)
export const getPublicBlogsService = (params) => {
    return API.get("/blog/public", {
        params,
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

// ✅ GET BLOG BY SLUG (PUBLIC DETAIL)
export const getBlogBySlugService = (slug) => {

    return API.get(`/blog/${slug}`, {
        headers: {
            "Cache-Control": "no-cache",
        },
    });
};

// ✅ UPDATE BLOG
export const updateBlogService = (id, data) => {
    return API.put(`/blog/${id}`, data);
};

// ✅ DELETE BLOG
export const deleteBlogService = (id) => {
    return API.delete(`/blog/${id}`);
};

// ✅ UPDATE BLOG STATUS (PUBLISH / DRAFT)
export const updateBlogStatusService = (id, status) => {
    return API.patch(`/blog/status/${id}`, { status });
};