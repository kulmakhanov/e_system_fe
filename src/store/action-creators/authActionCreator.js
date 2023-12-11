import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  REFRESH_TOKEN,
} from "../../type/types";

import AuthService from "../../services/authService";

export const register = (
  username,
  email,
  password,
  company_id,
  role_id,
) => dispatch => {
  return AuthService.register(
    username,
    email,
    password,
    company_id,
    role_id
  ).then(response => {
    dispatch({ type: REGISTER_SUCCESS });

    return Promise.resolve(response.data.message);
  },
    error => {
      const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
      dispatch({ type: REGISTER_FAIL });

      return Promise.reject(message);
    }
  );
};

export const login = (username, password) => dispatch => {
  return AuthService.login(username, password)
    .then(data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
      error => {
        const message = (error.response && error.response.data && error.response.data.message) ||
          error.message || error.toString();
        dispatch({ type: LOGIN_FAIL, });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
    });
};

export const logout = () => dispatch => {
  AuthService.logout();

  dispatch({ type: LOGOUT });
};

export const refreshToken = accessToken => dispatch => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: accessToken,
  });
};