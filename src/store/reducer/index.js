import { combineReducers } from "redux";
import addressBookReducer from "./addressBookReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import companyReducer from "./companyReducer";
import companyStrReducer from "./companyStrReducer";
import userReducer from "./userReducer";

export default combineReducers({
  addressBookReducer,
  authReducer,
  messageReducer,
  companyReducer,
  companyStrReducer,
  userReducer,
});