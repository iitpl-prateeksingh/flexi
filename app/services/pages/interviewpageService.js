import API from "../api";

export const getInterviewPageAdminService = (params = {}) => {
  return API.get("/interview", {
    params,
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

export const getAllInterviewsService = (page = 1, limit = 8) => {
  return API.get("/interview", {
    params: { page, limit },
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

export const getRecentInterviewsService = () => {
  return API.get("/interview/recent", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

export const saveInterviewPageService = (formData) => {
  return API.post("/interview", formData, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

export const updateInterviewHeadingService = (formData) => {
  return API.patch("/interview/heading", formData, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

export const addInterviewItemService = (formData) => {
  return API.post("/interview/item", formData, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

export const updateInterviewItemService = (interviewId, formData) => {
  return API.patch(`/interview/item/${interviewId}`, formData, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

export const updateInterviewVideoService = (interviewId, videoUrl) => {
  return API.patch(
    `/interview/item/${interviewId}/video`,
    { videoUrl },
    {
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );
};

export const reorderInterviewItemsService = (orders) => {
  return API.patch("/interview/reorder", orders, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

export const deleteInterviewItemService = (interviewId) => {
  return API.delete(`/interview/item/${interviewId}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};
