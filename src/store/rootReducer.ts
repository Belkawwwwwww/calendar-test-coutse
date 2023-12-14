import { combineReducers } from "redux";
import { userSlice } from "./slices/UserSlice";
import { boardSlice } from "./slices/BoardSlice";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  boards: boardSlice.reducer,
});
