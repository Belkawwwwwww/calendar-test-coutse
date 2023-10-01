import {AppDispatch} from "../index";
import {userSlice} from "../slices/UserSlice";
import axios from "axios";
import {IUser} from "../../models/models";

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        // axios, fetch
        dispatch(userSlice.actions.setLoading(true));
        const response = await axios.get<IUser[]>(`http://localhost:3000/users/${username}`)
        // обработать запрос
        // сверить пароль -- если ок авторизовать -- нет - не авторизовать
        //const mockUsers = response.data.find(user => user.username === username && user.password === password)
        if (password === password) {
            localStorage.setItem('auth', 'true');
            dispatch(userSlice.actions.setAuth(true))
        } else {
            dispatch(userSlice.actions.setError('Некорректный логин или пароль'))
        }
    } catch (e) {
        dispatch(userSlice.actions.setLoading(false))
        dispatch(userSlice.actions.setError('Произошла ошибка при логине'))
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.setAuth(false))
    localStorage.removeItem('auth')
}
export const register = (username: string, password: string, passwordConfirm: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.setLoading(true))
        const response = await axios.get<IUser[]>(`http://localhost:3000/users/${username}`)
        const mockUsers = response.data.find(user => user.username === username)
        if (mockUsers) {
            dispatch(userSlice.actions.setError('Такой логин уже существует'))
        } else if (password !== passwordConfirm) {
            dispatch(userSlice.actions.setError('Пароли не совпадают'))
        } else {

        }
        dispatch(userSlice.actions.setLoading(false))
    } catch (e) {
        dispatch(userSlice.actions.setError('Произошла ошибка при регистрации'))

    }
}