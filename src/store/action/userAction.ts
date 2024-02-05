import { AppDispatch } from "../index";
import { userSlice } from "../slices/UserSlice";
import ax from "../../utils/axios";
import { IResponse, IUser } from "../../lib/types";

export const isLoggedIn = () => {
  return !!sessionStorage.getItem("username");
};

export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.setLoading(true));
      const response = await ax.post<IResponse>("/authentication", {
        username: username,
        password: password,
      });
      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          sessionStorage.setItem("username", username);
          dispatch(userSlice.actions.setUser({ username }));
          dispatch(userSlice.actions.setIsAuth(true));
        },
        401: () =>
          dispatch(userSlice.actions.setError("Пользователь не существует")),
      };
      obj_action[response.data.statusCode]?.();
    } catch (e) {
      dispatch(userSlice.actions.setError("Некорректный логин или пароль"));
    }
  };
export const checkAuth = () => async (dispatch: AppDispatch) => {
  try {
    const response = await ax.get<IResponse<IUser>>("/profile");

    const userData = response.data.data;
    if (userData) {
      const userName = userData.username;

      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          dispatch(userSlice.actions.setIsAuth(true));
          dispatch(userSlice.actions.setUser({ username: userName }));
        },
      };
      obj_action[response.data.statusCode]?.();
    } else {
      dispatch(
        userSlice.actions.setError(
          "Произошла ошибка получения данных пользователя",
        ),
      );
    }
  } catch (e) {
    localStorage.removeItem("userId");
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    sessionStorage.removeItem("username");
    dispatch(userSlice.actions.setIsAuth(false));
    dispatch(userSlice.actions.setUser(null));
    await ax.post("/logout");
  } catch (e) {
    dispatch(userSlice.actions.setError("Произошла ошибка"));
  }
};

export const register =
  (username: string, password: string, password_confirm: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await ax.post<IResponse<IUser>>("/registration", {
        username: username,
        password: password,
        password_confirm: password_confirm,
      });
      console.log(response);
      if (response.data.statusCode !== 200) {
      } else {
        sessionStorage.setItem("username", username);
        dispatch(userSlice.actions.setUser({ username }));
        dispatch(userSlice.actions.setIsAuth(true));
      }
    } catch (e) {
      dispatch(userSlice.actions.setError("Произошла ошибка при регистрации"));
    }
  };
