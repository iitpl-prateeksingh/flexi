import API from "./api";

// ================= CREATE =================
export const createServiceApi = (data) => {
  return API.post("/services", data);
};

// ================= GET ALL =================
export const getAllServicesApi = () => {
  return API.get("/services", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

export const getPublicServices = () => {
  return API.get("/services/public", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

// ================= GET SINGLE =================
export const getServiceByIdApi = (id) => {
  return API.get(`/services/${id}`);
};

// ================= UPDATE =================
export const updateServiceApi = (id, data) => {
  return API.put(`/services/${id}`, data);
};

// ================= DELETE =================
export const deleteServiceApi = (id) => {
  return API.delete(`/services/${id}`);
};

// ================= SUB-SERVICES =================
export const addSubServiceApi = (serviceId, data) => {
  return API.post(`/services/${serviceId}/sub-services`, data);
};

export const getSubServicesApi = (serviceId) => {
  return API.get(`/services/${serviceId}/sub-services`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
};

export const updateSubServiceApi = (serviceId, subServiceId, data) => {
  return API.put(`/services/${serviceId}/sub-services/${subServiceId}`, data);
};

export const deleteSubServiceApi = (serviceId, subServiceId) => {
  return API.delete(`/services/${serviceId}/sub-services/${subServiceId}`);
};


export const getServiceBannerApi = () => {
  return API.get("/services/banner", {
    headers: {
      "Cache-Control": "no-cache",
    }
  });
};

// CREATE / UPDATE BANNER
export const upsertServiceBannerApi = (data) => {
  return API.post("/services/banner", data);
};