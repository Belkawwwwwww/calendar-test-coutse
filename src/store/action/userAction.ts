import { AppDispatch } from "../index";
import { userSlice } from "../slices/UserSlice";
import axios from "axios";

export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<{ id: string; password: string }>(
        `http://localhost:3000/users/${username}`,
      );
      if (response.status !== 200) {
        dispatch(userSlice.actions.setError("Некорректный логин"));
      } else if (response.data.password !== password) {
        dispatch(userSlice.actions.setError("Некорректный пароль"));
      } else {
        localStorage.setItem("auth", "true");
        dispatch(userSlice.actions.setAuth(true));
      }
    } catch (e) {
      dispatch(userSlice.actions.setError("Некорректный логин или пароль"));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.setAuth(false));
  dispatch(userSlice.actions.setError(undefined));
  localStorage.removeItem("auth");
  localStorage.removeItem("username");
};
export const register =
  (username: string, password: string, passwordConfirm: string) =>
  async (dispatch: AppDispatch) => {
    try {
      if (password !== passwordConfirm) {
        dispatch(userSlice.actions.setError("Пароли не совпадают"));
      }
      const response = await axios.post(`http://localhost:3000/users/`, {
        id: username,
        password: password
      })

    } catch (e) {
      dispatch(userSlice.actions.setError("Произошла ошибка при регистрации"));
    }
  };
