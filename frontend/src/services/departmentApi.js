import api from "./axios";

// Get all departments
export const getDepartments = () => api.get("/departments");

// Add department
export const addDepartment = (data) =>
  api.post("/departments", data);

// Delete department
export const deleteDepartment = (id) =>
  api.delete(`/departments/${id}`);

// Update department
export const updateDepartment = (id, data) =>
  api.put(`/departments/${id}`, data);
