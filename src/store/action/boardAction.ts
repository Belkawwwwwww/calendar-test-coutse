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
      const obj_action: {
        [key: number]: () => void;
      } = {
        1: () => {
          dispatch(modalSlice.actions.setIsModalOpen(false));
          dispatch(boardSlice.actions.setError(undefined));
        },
        2: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        7: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        10: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      };
      obj_action[response.data.answercode]?.();
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
    const obj_action: {
      [key: number]: () => void;
    } = {
      1: () => {
        const nameBoardData = response.data.data.map(
          (board: any) => board.nameBoard,
        );
        dispatch(boardSlice.actions.setNameBoard(nameBoardData));
      },
      2: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      7: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      9: () => dispatch(boardSlice.actions.setError(response.data.answer)),
    };
    obj_action[response.data.answercode]?.();
  } catch (e) {
    dispatch(
      userSlice.actions.setError("Произошла ошибка при получение доски"),
    );
  }
};
