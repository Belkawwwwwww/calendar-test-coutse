import {combineReducers} from "redux";
import {userSlice} from "./slices/UserSlice";

export const rootReducer = combineReducers({
    user: userSlice.reducer,
})