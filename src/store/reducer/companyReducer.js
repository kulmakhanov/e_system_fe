import {
  RETRIEVE_COMPANY_STR,
  REMOVE_STR_COMP_ID,
  REMOVE_ALL_STR_COM,
  APPEND_STR_COM_BYID,
  CREATE_COMPANY,
  REMOVE_ALL_COMPANY,
  UPDATE_COMPANYORSTRUCTURE
} from "../../type/types";

const initialState = [];

const companyReducer = (company = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case RETRIEVE_COMPANY_STR:
      return payload;
    case REMOVE_STR_COMP_ID:
      return payload;
    case REMOVE_ALL_STR_COM:
      return payload;
    case APPEND_STR_COM_BYID:
      return payload;
    case CREATE_COMPANY:
      return payload;
    case UPDATE_COMPANYORSTRUCTURE:
      return payload;
    case REMOVE_ALL_COMPANY:
      return [];
    default:
      return company;
  }
};

export default companyReducer;