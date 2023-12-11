import http from "./http-common";

const create = val => {
  return http.post("/api/company_structure", { str_name: val });
};

const getAll = () => {
  return http.get("/api/company_structure");
};

const removeById = id => {
  return http.delete(`/api/company_structure/${id}`);
};

const removeAll = () => {
  return http.delete("/api/company_structure");
};

const update = (id, val) => {
  return http.put(`/api/company_structure/${id}`, { str_name: val });
};

const CompanyStrService = {
  create,
  update,
  getAll,
  removeById,
  removeAll,
};

export default CompanyStrService;