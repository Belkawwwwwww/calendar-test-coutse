import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";


interface AuthSlice {
    isAuth: boolean;
}

const initialState: AuthSlice = {
    isAuth: false,

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, {payload}: PayloadAction<boolean>) {
            state.isAuth = payload
        },
    }

})

//const _isAuth = (state: RootState) => state.auth.isAuth;

//export const isAuthSelector = createSelector([_isAuth], (state) => state);



