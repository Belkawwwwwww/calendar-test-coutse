import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface AuthState {
    access: string
    username: string
    isAuth: boolean
}

const initialState: AuthState = {
    access: '',
    username: '',
    isAuth: false
}

interface AuthPayload {
    username: string
    access: string
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false
            state.access = ''
            state.username = ''
            localStorage.removeItem('username')
            localStorage.removeItem('access')
        },
        login(state, action: PayloadAction<AuthPayload>) {
            state.access = action.payload.access
            state.username = action.payload.username
            state.isAuth = Boolean(action.payload.access)

            localStorage.setItem('auth', 'true')
        }
    },
    extraReducers: {}
})


export default authSlice.reducer;