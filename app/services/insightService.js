import API from "./api";

// ✅ GET INSIGHT
export const getInsightApi = () => {
    return API.get("/insight");
};

export const getpublicInsight = () => {
    return API.get("/insight/public");
};

// ✅ UPDATE HEADING + DESCRIPTION
export const updateInsightContentApi = (data) => {
    return API.put("/insight/content", data);
};

// ✅ ADD ITEM
export const addInsightItemApi = (data) => {
    return API.post("/insight/item", data);
};

// ✅ UPDATE ITEM
export const updateInsightItemApi = (id, data) => {
    return API.put(`/insight/item/${id}`, data);
};

// ✅ DELETE ITEM
export const deleteInsightItemApi = (id) => {
    return API.delete(`/insight/item/${id}`);
};