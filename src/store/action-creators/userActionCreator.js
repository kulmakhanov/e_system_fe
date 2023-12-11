import userService from "../../services/userService";
import {
  RETRIEVE_ALL_USERS,
  RETRIEVE_USER_BYID,
  REMOVE_USER_BYID,
  RETRIEVE_ROLE,
} from "../../type/types";

export const getAll = () => async dispatch => {
  try {
    const res = await userService.getAll();

    dispatch({
      type: RETRIEVE_ALL_USERS,
      payload: res.data,
    });
  }
  catch(err) {
    console.log(err);
  }
};

export const getRole = () => async dispatch => {
  try {
    const res = await userService.getRole();

    dispatch({
      type: RETRIEVE_ROLE,
      payload: res.data,
    });
  }
  catch(err) {
    console.log(err);
  }
};

export const getById = id => async dispatch => {
  try {
    const res = await userService.getById(id);

    dispatch({
      type: RETRIEVE_USER_BYID,
      payload: res.data,
    });
  }
  catch(err) {
    console.log(err);
  }
};

export const removeById = id => async dispatch => {
  try {
    const res = await userService.removeById(id);

    dispatch({
      type: REMOVE_USER_BYID,
      payload: res.data.data,
    });

    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};