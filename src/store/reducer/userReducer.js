import {
  RETRIEVE_ALL_USERS,
  RETRIEVE_USER_BYID,
  REMOVE_USER_BYID,
  RETRIEVE_ROLE,
} from "../../type/types";

const initialState = { user: [], role: [] };

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case RETRIEVE_ALL_USERS:
      return { ...state, user: payload };
    case RETRIEVE_USER_BYID:
      return { ...state, user: payload };
    case REMOVE_USER_BYID:
      return { ...state, user: payload };
    case RETRIEVE_ROLE:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export default userReducer;