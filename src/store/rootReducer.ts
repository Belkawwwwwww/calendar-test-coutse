import { combineReducers } from "redux";
import { userSlice } from "./slices/UserSlice";
import {modalSlice} from "./slices/ModalSlice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  modal: modalSlice.reducer
});
