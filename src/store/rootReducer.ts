import { combineReducers } from "redux";
import { userSlice } from "./slices/UserSlice";
import { modalSlice } from "./slices/ModalSlice";
import { boardSlice } from "./slices/BoardSlice";
import { cardSlice } from "./slices/CardSlice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  modal: modalSlice.reducer,
  boards: boardSlice.reducer,
  cards: cardSlice.reducer,
});
