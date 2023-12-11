import {
  REMOVE_ALL_STRUCTURE,
  RETRIEVE_ALL_STR,
  REMOVE_STRUCTURE_BYID,
  CREATE_STRUCTURE,
  UPDATE_STRUCTURE_BYID,
} from "../../type/types";

const initialState = [];

const companyStrReducer = (companyStr = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case CREATE_STRUCTURE:
      return [...companyStr, payload];
    case RETRIEVE_ALL_STR:
      return payload;
    case UPDATE_STRUCTURE_BYID:
      return payload;
    case REMOVE_STRUCTURE_BYID:
      return payload;
    case REMOVE_ALL_STRUCTURE:
      return [];
    default:
      return companyStr;
  }
};

export default companyStrReducer;