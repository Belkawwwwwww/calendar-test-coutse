import {AppDispatch} from "../index";
import {userSlice} from "../slices/UserSlice";
import axios from "axios";

export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<{
          answercode: number;
          answer: string;
        }>(
            `https://api.safechron.online/authentication?username=${username}&password=${password}`
        );
        if (response.data.answercode === 1) {
            localStorage.setItem("isAuth", "true");
          localStorage.setItem("username", username);
          dispatch(userSlice.actions.setAuth(true));
            dispatch(userSlice.actions.setUser)
        } else if (response.data.answercode === 3) {
          dispatch(userSlice.actions.setError(response.data.answer));
        }
    } catch (e) {
      dispatch(userSlice.actions.setError("Некорректный логин или пароль"));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
    const response = await axios.get<{
        answercode: number;
        answer: string
    }>(
        `https://api.safechron.online/logout`
    );
    if (response.data.answercode === 2) {
        dispatch(userSlice.actions.setAuth(false));
        dispatch(userSlice.actions.setError(undefined));
        localStorage.removeItem("isAuth");
        localStorage.removeItem("username");
    }

};
export const register =
  (username: string, password: string, passwordConfig: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<{ answercode: number; answer: string }>(
        "https://api.safechron.online/registration",
        {
          username: username,
          password: password,
          passwordConfig: passwordConfig,
        },
      );
        if (response.data.answercode === 1) {
        dispatch(userSlice.actions.setAuth(true));
            localStorage.setItem("isAuth", "true");
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
