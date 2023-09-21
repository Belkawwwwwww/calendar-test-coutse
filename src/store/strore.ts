import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice"
import authReducer from "./slices/authSlice";
import {authApi} from "../service/authApi"


const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


