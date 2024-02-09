import { AppDispatch } from "../index";
import { userSlice } from "../slices/UserSlice";
import ax from "../../utils/axios";
import { IResponse, IUser } from "../../lib/types";

export const isLoggedIn = () => {
  return !!sessionStorage.getItem("username");
};

export const login =
  (username: string, password: string) =>
  async (dispatch: AppDispatch): Promise<IUser | undefined> => {
    try {
      dispatch(userSlice.actions.setLoading(true));
      const response = await ax.post<IResponse<IUser>>("/authentication", {
        username: username,
        password: password,
      });
      if (response.status) {
        const userData = response.data.data;
        sessionStorage.setItem("username", username);
        dispatch(userSlice.actions.setUser({ username }));
        dispatch(userSlice.actions.setIsAuth(true));
        dispatch(userSlice.actions.setError(undefined));
        dispatch(userSlice.actions.setLoading(false));
        return userData;
      }
    } catch (e) {
      dispatch(userSlice.actions.setError("Некорректный логин или пароль"));
    } finally {
      dispatch(userSlice.actions.setLoading(false));
    }
  };
export const checkAuth =
  () =>
  async (dispatch: AppDispatch): Promise<IUser | void> => {
    try {
      const response = await ax.get<IResponse<IUser>>("/profile");
      const userData = response.data.data;

      if (userData) {
        const backendUsername = userData.username;
        const sessionUsername = sessionStorage.getItem("username");

        if (sessionUsername !== backendUsername) {
          sessionStorage.removeItem("username");
          return;
        }

        if (response.status) {
          dispatch(userSlice.actions.setIsAuth(true));
          dispatch(userSlice.actions.setUser({ username: backendUsername }));
        }
        return userData;
      } else {
        dispatch(userSlice.actions.setLoading(false));
        sessionStorage.removeItem("username");
        dispatch(
          userSlice.actions.setError(
            "Произошла ошибка получения данных пользователя",
          ),
        );
      }
    } catch (e) {}
  };
export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const response = await ax.post("/logout");
    if (response.status) {
      sessionStorage.removeItem("username");
      dispatch(userSlice.actions.setIsAuth(false));
      dispatch(userSlice.actions.setUser(null));
    }
  } catch (e) {
    dispatch(userSlice.actions.setError("Произошла ошибка"));
  }
};

export const register =
  (username: string, password: string, password_confirm: string) =>
  async (dispatch: AppDispatch): Promise<IUser | undefined> => {
    try {
      const response = await ax.post<IResponse<IUser>>("/registration", {
        username: username,
        password: password,
        password_confirm: password_confirm,
      });
      if (response.data.statusCode !== 200) {
        dispatch(
          userSlice.actions.setError("Произошла ошибка при регистрации"),
        );
      } else {
        const userData = response.data.data;
        sessionStorage.setItem("username", username);
        dispatch(userSlice.actions.setUser({ username }));
        dispatch(userSlice.actions.setIsAuth(true));
        dispatch(userSlice.actions.setError(undefined));
        dispatch(userSlice.actions.setLoading(false));
        return userData;
      }
    } catch (e) {
      dispatch(userSlice.actions.setError("Произошла ошибка при регистрации"));
    } finally {
      dispatch(userSlice.actions.setLoading(false));
    }
  };
