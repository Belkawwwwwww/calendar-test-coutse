import { AppDispatch } from "../index";
import { userSlice } from "../slices/UserSlice";
import ax from "../../utils/axios";
import { IUser } from "../../models/models";

export const checkAuth = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await ax.get<{
      answercode: number;
      answer: string;
      data: any;
    }>(`/profile?userId=${userId}`);
    console.log(response);
    const userName = response.data.data.userName;
    if (response.data.answercode === 1) {
      dispatch(userSlice.actions.setUser(userName));
      dispatch(userSlice.actions.setIsAuth(true));
    } else if (response.data.answercode === 2) {
      dispatch(userSlice.actions.setError(response.data.answer));
    } else if (response.data.answercode === 2) {
      dispatch(userSlice.actions.setError(response.data.answer));
    }
  } catch (e) {
    dispatch(userSlice.actions.setError("Произошла ошибка"));
  }
};
export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.setLoading(true))
      const response = await ax.get<{
        answercode: number;
        answer: string;
        data: any;
      }>(`/authentication?username=${username}&password=${password}`);
      console.log(response);
      if (response.data.answercode === 1) {
        localStorage.setItem("userId", response.data.data.userId);
        //dispatch(userSlice.actions.setUser(username))
        //dispatch(userSlice.actions.setUser(response.data.data.userName));
        dispatch(userSlice.actions.setIsAuth(true));
        dispatch(userSlice.actions.setError(undefined));
      } else if (response.data.answercode === 3) {
        dispatch(userSlice.actions.setError(response.data.answer));
      }
    } catch (e) {
      dispatch(userSlice.actions.setError("Некорректный логин или пароль"));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem("userId");
  dispatch(userSlice.actions.setIsAuth(false));
  dispatch(userSlice.actions.setError(undefined));
  dispatch(userSlice.actions.setUser({} as IUser));
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
      );

      if (response.data.answercode === 1) {
        dispatch(userSlice.actions.setIsAuth(true));
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

