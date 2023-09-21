import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice"
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authSlice
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


