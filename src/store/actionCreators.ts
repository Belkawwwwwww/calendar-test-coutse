import axios from "../axios";
import {AppDispatch} from "./strore";
import {IAuth, IAuthResponse, IUser} from "../models/models";
import {userSlice} from "./slices/UserSlice";
import {authSlice} from "./slices/authSlice";

export const fetchUsers = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(userSlice.actions.usersFetching())
            const response = await axios.get<IUser>('users')
            dispatch(userSlice.actions.usersFetchingSuccess)
            return response.data
        } catch (e) {
            dispatch(userSlice.actions.usersFetchingError(e as Error))
        }
    }
}

export const register = (data: IAuth) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<IAuthResponse>(`auth/register`, data)
            dispatch(authSlice.actions.loginSuccess({
                access: response.data.access,
                username: data.username
            }))
        } catch (e) {
            console.log('Error register', e)
        }
    }
}

export const login = (data: IAuth) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<IAuthResponse>(`auth/login`, data)
            dispatch(authSlice.actions.loginSuccess({
                access: response.data.access,
                username: data.username
            }))
        } catch (e) {
            console.log('Error login', e)
        }
    }
}
