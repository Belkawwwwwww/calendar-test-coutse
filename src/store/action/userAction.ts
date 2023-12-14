import { AppDispatch } from "../index";
import { userSlice } from "../slices/UserSlice";
import ax from "../../utils/axios";
import { IResponse } from "../../lib/types";

interface User {
  id: number;
  created: string;
  updated: string;
  deletedAt: string | null;
  username: string;
}
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

      if (response.data.statusCode !== 200) {
        dispatch(userSlice.actions.setError(response.data.message));
      } else {
        sessionStorage.setItem("username", username);
        dispatch(userSlice.actions.setUser({ username }));
        dispatch(userSlice.actions.setIsAuth(true));
      }
    } catch (e) {
      dispatch(userSlice.actions.setError("Некорректный логин или пароль"));
    }
  };
export const checkAuth = () => async (dispatch: AppDispatch) => {
  try {
    const response = await ax.get<IResponse<User>>("/profile");

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
        401: () => dispatch(userSlice.actions.setError(response.data.message)),
        403: () => dispatch(userSlice.actions.setError(response.data.message)),
        404: () => dispatch(userSlice.actions.setError(response.data.message)),
        500: () => dispatch(userSlice.actions.setError(response.data.message)),
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
    // dispatch(userSlice.actions.setError("Произошла ошибка"));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    sessionStorage.removeItem("username")
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
      const response = await ax.post<IResponse<User>>(`/registration`, {
        username: username,
        password: password,
        password_confirm: password_confirm,
      });
      console.log(response);
      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          dispatch(userSlice.actions.setIsAuth(true));
          // localStorage.setItem("userId", response.data.data.userId);
          dispatch(userSlice.actions.setUser({ username }));
        },
        // 4: () => dispatch(userSlice.actions.setError(response.data.answer)),
        // 5: () => dispatch(userSlice.actions.setError(response.data.answer)),
        // 7: () => dispatch(userSlice.actions.setError(response.data.answer)),
      };
      obj_action[response.data.statusCode]?.();
    } catch (e) {
      dispatch(userSlice.actions.setError("Произошла ошибка при регистрации"));
    }
  };
