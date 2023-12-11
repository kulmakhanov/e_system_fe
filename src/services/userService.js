import authHeader from "./authHeader";
import http from "./http-common";

const getAll = () => {
  return http.get("/api/admin", { headers: authHeader() });
};

const getRole = () => {
  return http.get("/api/admin-get-role", { headers: authHeader() });
};

const getById = id => {
  return http.get(`/api/admin/${id}`, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/api/admin/${id}`, { headers: authHeader() });
};

const removeById = id => {
  return http.delete(`/a[i/admin/${id}]`, { headers: authHeader() });
};

const UserService = {
  getAll,
  getRole,
  getById,
  update,
  removeById,
};

export default UserService;