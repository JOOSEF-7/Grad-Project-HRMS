import api from "./axios";

// Get all employees
export const getEmployees = () => api.get("/employees");

// Get single employee
export const getEmployeeById = (id) => api.get(`/employees/${id}`);

// Add employee
export const addEmployee = (data) => api.post("/employees", data);

// Update employee
export const updateEmployee = (id, data) =>
  api.put(`/employees/${id}`, data);

// Delete employee
export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`);
