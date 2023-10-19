import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { userSlice } from "../slices/UserSlice";

export const create = (nameboard: string) => async (dispatch: AppDispatch) => {
  try {
    const user_id = localStorage.getItem("user_id");
    const response = await ax.post<{ answercode: number; answer: string }>(
      "/createBoard",
      {
        nameboard: nameboard,
        user_id: user_id,
      },
    );
    console.log(response);
    if (response.data.answercode === 1) {
    } else if (response.data.answercode === 10) {
      dispatch(userSlice.actions.setError(response.data.answer));
    } else if (response.data.answercode === 2) {
      dispatch(userSlice.actions.setError(response.data.answer));
    } else if (response.data.answercode === 7) {
      dispatch(userSlice.actions.setError(response.data.answer));
    }
  } catch (e) {
    //dispatch(userSlice.actions.setError("Произошла ошибка при регистрации"));
  }
};
