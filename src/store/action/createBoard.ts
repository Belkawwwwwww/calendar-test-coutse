import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { userSlice } from "../slices/UserSlice";
import { modalSlice } from "../slices/ModalSlice";

export const create = (nameBoard: string) => async (dispatch: AppDispatch) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await ax.post<{ answercode: number; answer: string }>(
      "/createBoard",
      {
        nameBoard: nameBoard,
        userId: userId,
      },
    );
    console.log(response);
    if (response.data.answercode === 1) {
      dispatch(modalSlice.actions.setIsModalOpen(false));
      //dispatch(modalSlice.actions.setNameBoard(nameBoard));
      dispatch(userSlice.actions.setError(undefined));
    } else if (response.data.answercode === 10) {
      dispatch(userSlice.actions.setError(response.data.answer));
    } else if (response.data.answercode === 2) {
      dispatch(userSlice.actions.setError(response.data.answer));
    } else if (response.data.answercode === 7) {
      dispatch(userSlice.actions.setError(response.data.answer));
    }
  } catch (e) {
    dispatch(userSlice.actions.setError("Произошла ошибка при создании доски"));
  }
};
