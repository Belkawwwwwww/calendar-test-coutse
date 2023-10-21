import { AppDispatch } from "../index";
import { userSlice } from "../slices/UserSlice";
// import axios from "axios";
import ax from "../../utils/axios";

export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await ax.get<{
        answercode: number;
        answer: string;
        data: any;
      }>(`/authentication?username=${username}&password=${password}`);
        console.log(response);
      if (response.data.answercode === 1) {
        dispatch(userSlice.actions.setAuth(true));
        dispatch(userSlice.actions.setUser(response.data.data.user_id));
        localStorage.setItem("user_id", response.data.data.user_id);
        dispatch(userSlice.actions.setError(undefined));
      } else if (response.data.answercode === 3) {
        dispatch(userSlice.actions.setError(response.data.answer));
      }
    } catch (e) {
      dispatch(userSlice.actions.setError("Некорректный логин или пароль"));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("user_id");
    dispatch(userSlice.actions.setAuth(false));
    dispatch(userSlice.actions.setError(undefined));
};
export const register =
  (username: string, password: string, passwordConfig: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await ax.post<{ answercode: number; answer: string }>(
        "/registration",
        {
          username: username,
          password: password,
          passwordConfig: passwordConfig,
        },
        // {withCredentials: true}
      );

      if (response.data.answercode === 1) {
        dispatch(userSlice.actions.setAuth(true));
      } else if (response.data.answercode === 4) {
        dispatch(userSlice.actions.setError(response.data.answer));
      } else if (response.data.answercode === 3) {
        dispatch(userSlice.actions.setError(response.data.answer));
      } else if (response.data.answercode === 5) {
        dispatch(userSlice.actions.setError(response.data.answer));
      }
    } catch (e) {
      dispatch(userSlice.actions.setError("Произошла ошибка при регистрации"));
    }
  };

