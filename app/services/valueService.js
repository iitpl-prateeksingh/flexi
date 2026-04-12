import API from "./api";

// CREATE
export const createValueApi = (data) => {
  return API.post("/value", data);
};

// GET ALL (ADMIN)
export const getAllValuesApi = () => {
  return API.get("/value");
};

// GET PUBLIC
export const getPublicValuesApi = () => {
  return API.get("/value/public");
};

// GET SINGLE
export const getValueByIdApi = (id) => {
  return API.get(`/value/${id}`);
};

// UPDATE
export const updateValueApi = (id, data) => {
  return API.put(`/value/${id}`, data);
};

// DELETE
export const deleteValueApi = (id) => {
  return API.delete(`/value/${id}`);
};
