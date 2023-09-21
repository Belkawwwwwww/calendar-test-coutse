import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
    isAuth: boolean
    username: string
}

const initialState : AuthState = {
    isAuth: false,
    username: ''
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload
            state.isLogged = true
        }
    },
    extraReducers: {}
})

export default authSlice.reducer;