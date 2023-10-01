// import {IUser} from "../../../models/IUser";
import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./type";
// import {AppDispatch} from "../../strore";
import axios from "axios";
import {IUser} from "../../../models/models";

export const AuthActionCreators = {
     setUser: (user: IUser): SetUserAction => ({type: AuthActionsEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionsEnum.SET_IS_LOADING, payload}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload}),
    //  login: (username: string, password: string) => async (dispatch: AppDispatch) => {
    //     try {
    //         dispatch(AuthActionCreators.setIsLoading(true))
    //         const response = await axios.get<IUser[]>('./users.json')
    //         const mockUsers = response.data.find(user => user.username === username && user.password === password)
    //         if (mockUsers) {
    //             localStorage.setItem('auth', 'true');
    //             localStorage.setItem('username', mockUsers.username);
    //             dispatch(AuthActionCreators.setUser(mockUsers))
    //             dispatch(AuthActionCreators.setIsAuth(true))
    //         } else {
    //             dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
    //         }
    //         dispatch(AuthActionCreators.setIsLoading(false))
    //
    //     } catch (e) {
    //         dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
    //     }
    // },
    // logout: () => async (dispatch: AppDispatch) => {
    //     localStorage.removeItem('auth')
    //     localStorage.removeItem('username')
    //     dispatch(AuthActionCreators.setUser({} as IUser))
    //     dispatch(AuthActionCreators.setIsAuth(false))
    // },
    // register: (username: string, password: string, passwordConfirm: string) => async (dispatch: AppDispatch) => {
    //     try {
    //         dispatch(AuthActionCreators.setIsLoading(true));
    //         const response = await axios.get<IUser[]>('./users.json');
    //         const mockUsers = response.data.find(user => user.username === username)
    //         if (mockUsers) {
    //             dispatch(AuthActionCreators.setError('Такой логин уже существует'))
    //
    //         } else if (password !== passwordConfirm) {
    //             dispatch(AuthActionCreators.setError('Пароли не совпадают'))
    //
    //         } else {
    //             localStorage.setItem('auth', 'true');
    //             dispatch(AuthActionCreators.setIsAuth(true))
    //         }
    //         dispatch(AuthActionCreators.setIsLoading(false))
    //     } catch (e) {
    //         dispatch(AuthActionCreators.setError('Произошла ошибка при регистрации'))
    //     }
    // }
}