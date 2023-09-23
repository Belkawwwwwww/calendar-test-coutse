import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {authApi} from "../service/authApi";


const rootReducer = combineReducers({

    authReducer,
    [authApi.reducerPath]: authApi.reducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


