import {
  ADD_ADDRESS_BOOK,
  RETRIEVE_ADDRESS_BOOK,
  REMOVE_ADDRESS_BOOK_BYID,
  REMOVE_ALL_ADDRESS_BOOK,
  UPDATE_ADDRESS_BOOK_BYID
} from "../../type/types";

const initialState = [];

const addressBookReducer = (addressbook = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case ADD_ADDRESS_BOOK:
      return payload;
    case UPDATE_ADDRESS_BOOK_BYID:
      return payload;
    case RETRIEVE_ADDRESS_BOOK:
      return payload;
    case REMOVE_ADDRESS_BOOK_BYID:
      return payload;
    case REMOVE_ALL_ADDRESS_BOOK:
      return [];
    default:
      return addressbook;
  }
};

export default addressBookReducer;