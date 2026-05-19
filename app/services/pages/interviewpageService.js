import API from "../api";

export const getInterviewPageAdminService = () => {
  return API.get("/interview", {
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

export const deleteInterviewItemService = (interviewId) => {
  return API.delete(`/interview/item/${interviewId}`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};
