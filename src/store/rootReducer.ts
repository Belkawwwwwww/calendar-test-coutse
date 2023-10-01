import {combineReducers} from "redux";
import {userSlice} from "./slices/UserSlice";
import {authSlice} from "./slices/authSlice"

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    auth: authSlice.reducer,
})