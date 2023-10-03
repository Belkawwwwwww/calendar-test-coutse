import {AppDispatch} from "../index";
import {userSlice} from "../slices/UserSlice";
import axios from "axios";
import {IUser} from "../../models/models";

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<IUser[]>(`http://localhost:3000/users/${username}`)
        const data = await response
        if (data) {
            localStorage.setItem('auth', 'true');
            dispatch(userSlice.actions.setAuth(true))
        } 

    } catch (e) {
        dispatch(userSlice.actions.setError('Некорректный логин или пароль'))
    }


    // localStorage.setItem('username', username)
    // localStorage.setItem('auth', 'true');
    // dispatch(userSlice.actions.setAuth(true))
    // axios, fetch
    //const response = await axios.get<IUser[]>(`http://localhost:3000/users/${username}`)
    // обработать запрос
    // сверить пароль -- если ок авторизовать -- нет - не авторизовать
    // const mockUsers = response.data.find(user => user.password === password)
    // if (mockUsers) {
    //     dispatch(userSlice.actions.setAuth(true))
    //     localStorage.setItem('auth', 'true');
    // } else {
    //     dispatch(userSlice.actions.setError('Некорректный логин или пароль'))
    // }

}

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.setAuth(false))
    dispatch(userSlice.actions.setError(undefined));
    localStorage.removeItem('auth')
    localStorage.removeItem('username')
}
export const register = (username: string, password: string, passwordConfirm: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.setLoading(true))
        const newUser = await axios.get(`http://localhost:3000/users/`)
        console.log(newUser);
        dispatch(userSlice.actions.setLoading(false))
    } catch (e) {
        dispatch(userSlice.actions.setError('Произошла ошибка при регистрации'))

    }
}