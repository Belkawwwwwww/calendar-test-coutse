import {AppDispatch} from "../index";
import {userSlice} from "../slices/UserSlice";
// import axios from "axios";
import ax from "../../utils/axios/axios"

export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {

        const response = await ax.get<{
            answercode: number;
            answer: string;
            data: any
            user_id: number
        }>(
            `/authentication?username=${username}&password=${password}`,
        );

        console.log(response.data.data.user_id);
        if (response.data.answercode === 1) {
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("username", username);
            dispatch(userSlice.actions.setAuth(true));
            dispatch(userSlice.actions.setUser(response.data.data.user_id))
        } else if (response.data.answercode === 3) {
          dispatch(userSlice.actions.setError(response.data.answer));
        }
    } catch (e) {
      dispatch(userSlice.actions.setError("Некорректный логин или пароль"));
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
    const response = await ax.get<{
        answercode: number;
        answer: string
    }>(
        `/logout`
    );

    console.log(response);
    if (response.data.answercode === 2) {

    } else {
        dispatch(userSlice.actions.setAuth(false));
        dispatch(userSlice.actions.setError(undefined));
        dispatch(userSlice.actions.setUser)
        localStorage.removeItem("isAuth");
        localStorage.removeItem("username");
    }

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
