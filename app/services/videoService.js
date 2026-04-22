import API from "./api";

export const uploadVideoService = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    return API.post("/upload/video", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Cache-Control": "no-cache"
        }
    });
};