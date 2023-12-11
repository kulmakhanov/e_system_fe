import CompanyStrService from "../../services/companyStrService";
import {
  CREATE_STRUCTURE,
  REMOVE_ALL_STRUCTURE,
  RETRIEVE_ALL_STR,
  REMOVE_STRUCTURE_BYID,
  UPDATE_STRUCTURE_BYID,
} from "../../type/types";

export const create = name => async dispatch => {
  try {
    const res = await CompanyStrService.create(name);

    dispatch({
      type: CREATE_STRUCTURE,
      payload: res.data.data,
    });

    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const retrieveStr = () => async dispatch => {
  try {
    const res = await CompanyStrService.getAll();

    dispatch({
      type: RETRIEVE_ALL_STR,
      payload: res.data,
    });
  }
  catch(err) {
    console.log(err);
  }
};

export const removeStrById = id => async dispatch => {
  try {
    const res = await CompanyStrService.removeById(id);

    dispatch({
      type: REMOVE_STRUCTURE_BYID,
      payload: res.data.data,
    });

    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const removeAllStr = () => async dispatch => {
  try {
    const res = await CompanyStrService.removeAll();

    dispatch({
      type: REMOVE_ALL_STRUCTURE,
      payload: res.data,
    });

    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const update = (id, name) => async dispatch => {
  try {
    const res = await CompanyStrService.update(id, name);

    dispatch({
      type: UPDATE_STRUCTURE_BYID,
      payload: res.data.data,
    });

    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};