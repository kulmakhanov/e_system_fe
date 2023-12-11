import http from "./http-common";

const create = (name, sort_id, uid) => {
  return http.post("/api/company/", { name: name, sort_id: sort_id, uid: uid });
};

const getAll = () => {
  return http.get("/api/company/");
};

const getById = id => {
  return http.get(`/api/company/${id}`);
};

const appendStrCom = (id_com, id_str, uid) => {
  return http.post("/api/company/strcom/", {
    id_com: id_com,
    id_str: id_str,
    uid: uid,
  });
};

const removeStrCom = (id, id_str) => {
  return http.delete(`/api/company/${id}`, { data: { ids: id_str } });
};

const removeAllStrCom = id => {
  return http.delete(`/api/company/all_str_com/${id}`);
};

const removeAll = () => {
  return http.delete("/api/company");
};

const update = (id, items) => {
  return http.put(`/api/company/${id}`, { items });
};

const CompanyService = {
  create,
  getAll,
  getById,
  removeStrCom,
  removeAllStrCom,
  removeAll,
  appendStrCom,
  update,
};

export default CompanyService;