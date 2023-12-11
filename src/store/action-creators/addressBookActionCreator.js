import AddressBookService from "../../services/addressBookService";
import {
  ADD_ADDRESS_BOOK,
  REMOVE_ADDRESS_BOOK_BYID,
  REMOVE_ALL_ADDRESS_BOOK,
  RETRIEVE_ADDRESS_BOOK,
  UPDATE_ADDRESS_BOOK_BYID
} from "../../type/types";

export const retrieveAddressBook = (val1, val2, val3) => async dispatch => {
  try {
    var res = "";
    if(val2 === "all") {
      res = await AddressBookService.getAll();
    }
    else if(val2 === "com") {
      res = await AddressBookService.getAllByCompany(val1);
    }
    else {
      res = await AddressBookService.getAllByCompanyStr(val1, val3);
    }
    dispatch({
      type: RETRIEVE_ADDRESS_BOOK,
      payload: res.data,
    });
  }
  catch(err) {
    console.log(err);
  }
};

export const removeAddressBookById = id => async dispatch => {
  try {
    const res = await AddressBookService.remove(id);

    dispatch({
      type: REMOVE_ADDRESS_BOOK_BYID,
      payload: res.data.data,
    });
    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const addAddressBook = info => async dispath => {
  try {
    const res = await AddressBookService.create(info);

    dispath({
      type: ADD_ADDRESS_BOOK,
      payload: res.data.data,
    });
    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const removeAddressBookAll = () => async dispatch => {
  try {
    const res = await AddressBookService.removeAll();

    dispatch({
      type: REMOVE_ALL_ADDRESS_BOOK,
      payload: res.data,
    });

    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};

export const updateAddressBook = (id, data) => async dispatch => {
  try {
    const res = await AddressBookService.update(id, data);

    dispatch({
      type: UPDATE_ADDRESS_BOOK_BYID,
      payload: res.data.data,
    });

    return Promise.resolve(res.data.message);
  }
  catch(err) {
    return Promise.reject(err);
  }
};