import CompanyService from "../../services/companyService";

import {
  REMOVE_STR_COMP_ID,
  RETRIEVE_COMPANY_STR,
  REMOVE_ALL_STR_COM,
  APPEND_STR_COM_BYID,
  CREATE_COMPANY,
  REMOVE_ALL_COMPANY,
  UPDATE_COMPANYORSTRUCTURE,
} from "../../type/types";

export const create = (name, sort_id, uid) => async dispatch => {
  try {
    const res = await CompanyService.create(name, sort_id, uid);

    dispatch({
      type: CREATE_COMPANY,
      payload: res.data.data,
    });

    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const retrieveCompany = () => async dispatch => {
  try {
    const res = await CompanyService.getAll();

    dispatch({
      type: RETRIEVE_COMPANY_STR,
      payload: res.data,
    });
  }
  catch(err) {
    console.log(err);
  }
};

export const appendStrComById = (id_com, id_str, uid) => async dispatch => {
  try {
    const res = await CompanyService.appendStrCom(id_com, id_str, uid);

    dispatch({
      type: APPEND_STR_COM_BYID,
      payload: res.data.data,
    });

    return Promise.resolve(res.data);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const removeStrComp = (id_com, id_str) => async dispatch => {
  try {
    const res = await CompanyService.removeStrCom(id_com, id_str);

    dispatch({
      type: REMOVE_STR_COMP_ID,
      payload: res.data.data,
    });

    return Promise.resolve(res.data);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const removeAllStrCom = id => async dispatch => {
  try {
    const res = await CompanyService.removeAllStrCom(id);

    dispatch({
      type: REMOVE_ALL_STR_COM,
      payload: res.data.data,
    });

    return Promise.resolve(res.data);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const removeAll = () => async dispatch => {
  try {
    const res = await CompanyService.removeAll();

    dispatch({
      type: REMOVE_ALL_COMPANY,
      payload: res.data,
    });

    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const update = (id, items) => async dispatch => {
  try {
    const res = await CompanyService.update(id, items);

    dispatch({
      type: UPDATE_COMPANYORSTRUCTURE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  }
  catch(err) {
    return Promise.reject(err);
  }
};