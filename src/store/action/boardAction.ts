import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { userSlice } from "../slices/UserSlice";
import { modalSlice } from "../slices/ModalSlice";
import { boardSlice } from "../slices/BoardSlice";

export const createBoard =
  (nameBoard: string) => async (dispatch: AppDispatch) => {
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
      dispatch(
        userSlice.actions.setError("Произошла ошибка при создании доски"),
      );
    }
  };

export const getBoard = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await ax.get<{
      answercode: number;
      answer: string;
      data: any;
    }>(`/getBoard?userId=${userId}`);
    console.log(response);
    if (response.data.answercode === 1) {
      dispatch(boardSlice.actions.setNameBoard(response.data.data.nameBoard));
    } else if (response.data.answercode === 2) {
      dispatch(userSlice.actions.setError(response.data.answer));
    } else if (response.data.answercode === 7) {
      dispatch(userSlice.actions.setError(response.data.answer));
    } else if (response.data.answercode === 9) {
      dispatch(userSlice.actions.setError(response.data.answer));
    }
  } catch (e) {
    dispatch(
      userSlice.actions.setError("Произошла ошибка при получение доски"),
    );
  }
};
