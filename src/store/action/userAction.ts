import { AppDispatch } from "../index";
import { userSlice } from "../slices/UserSlice";
import ax from "../../utils/axios";
import { boardSlice } from "../slices/BoardSlice";
import { IResponse } from "../../lib/types";

export const checkAuth = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await ax.get<IResponse>(`/profile?userId=${userId}`);
    console.log(response);
    const userName = response.data.data.userName;
    const obj_action: {
      [key: number]: () => void;
    } = {
      1: () => {
        dispatch(userSlice.actions.setUser({ username: userName }));
        dispatch(userSlice.actions.setIsAuth(true));
      },
      2: () => dispatch(userSlice.actions.setError(response.data.answer)),
      7: () => dispatch(userSlice.actions.setError(response.data.answer)),
      8: () => dispatch(userSlice.actions.setError(response.data.answer)),
    };
    obj_action[response.data.answercode]?.();
  } catch (e) {
    localStorage.removeItem("userId");
    dispatch(userSlice.actions.setError("Произошла ошибка"));
  }
};
export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.setLoading(true));
      const response = await ax.get<IResponse>(
        `/authentication?username=${username}&password=${password}`,
      );
      console.log(response);
      const userName = response.data.data.userName;
      const obj_action: {
        [key: number]: () => void;
      } = {
        1: () => {
          localStorage.setItem("userId", response.data.data.userId);
          dispatch(userSlice.actions.setUser({ username: userName }));
          dispatch(userSlice.actions.setIsAuth(true));
          dispatch(userSlice.actions.setError(undefined));
          dispatch(userSlice.actions.setLoading(false));
        },
        3: () => dispatch(userSlice.actions.setError(response.data.answer)),
        7: () => dispatch(userSlice.actions.setError(response.data.answer)),
        8: () => dispatch(userSlice.actions.setError(response.data.answer)),
      };
      obj_action[response.data.answercode]?.();
    } catch (e) {
      dispatch(userSlice.actions.setError("Некорректный логин или пароль"));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem("userId");
  dispatch(userSlice.actions.setIsAuth(false));
  dispatch(userSlice.actions.setError(undefined));
  dispatch(userSlice.actions.setUser(null));
  dispatch(boardSlice.actions.setBoard(null));
  dispatch(boardSlice.actions.setError(undefined));
};
export const register =
  (username: string, password: string, passwordConfig: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await ax.post<IResponse>("/registration", {
        username: username,
        password: password,
        passwordConfig: passwordConfig,
      });
      console.log(response);
      const userName = response.data.data.userName;
      const obj_action: {
        [key: number]: () => void;
      } = {
        1: () => {
          dispatch(userSlice.actions.setIsAuth(true));
          localStorage.setItem("userId", response.data.data.userId);
          dispatch(userSlice.actions.setUser({ username: userName }));
        },
        4: () => dispatch(userSlice.actions.setError(response.data.answer)),
        5: () => dispatch(userSlice.actions.setError(response.data.answer)),
        7: () => dispatch(userSlice.actions.setError(response.data.answer)),
      };
      obj_action[response.data.answercode]?.();
    } catch (e) {
      dispatch(userSlice.actions.setError("Произошла ошибка при регистрации"));
    }
  };
