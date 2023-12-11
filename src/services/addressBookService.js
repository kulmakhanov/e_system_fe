import http from "./http-common";

const getAll = () => {
  return http.get("/api/address_book");
};

const getAllByCompany = id => {
  return http.get(`/api/address_book/company/${id}`);
};

const getAllByCompanyStr = (id, company_id) => {
  return http.post(`/api/address_book/company_str/${id}`, { company_id });
};

const getById = id => {
  return http.get(`/api/address_book/${id}`);
};

const create = data => {
  return http.post("/api/address_book", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const update = (id, data) => {
  return http.put(`/api/address_book/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const remove = id => {
  return http.delete(`/api/address_book/${id}`);
};

const removeAll = () => {
  return http.delete("/api/address_book");
};

const findByTitle = title => {
  return http.get(`/api/address_book?title=${title}`);
};

const AddressBookService = {
  getAll,
  getAllByCompany,
  getAllByCompanyStr,
  getById,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default AddressBookService;