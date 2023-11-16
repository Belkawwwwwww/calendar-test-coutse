import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { userSlice } from "../slices/UserSlice";
import { modalSlice } from "../slices/ModalSlice";
import { boardSlice } from "../slices/BoardSlice";

export const createBoard =
  (nameBoard: string) => async (dispatch: AppDispatch) => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      const response = await ax.post<{
        answercode: number;
        answer: string;
        data: any;
      }>("/createBoard", {
        nameBoard: nameBoard,
        userId: userId,
      });
      console.log(response);
      const obj_action: {
        [key: number]: () => void;
      } = {
        1: () => {
          // const boardData = response.data.data.map(
          //     (board: { id: number; nameBoard: string }) => ({
          //       id: board.id,
          //       nameBoard: board.nameBoard,
          //     })
          // );
          // const boardId = response.data.data.id;

          //dispatch(boardSlice.actions.setNameBoard(boardId));
          dispatch(modalSlice.actions.setIsModalOpen(false));
          dispatch(boardSlice.actions.setError(undefined));
        },
        2: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        7: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        10: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      };
      obj_action[response.data.answercode]?.();
      dispatch(getBoard(userId));
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
      data?: any;
    }>(`/getBoard?userId=${userId}`);
    console.log(response);
    const data = response.data?.data
    if (data) {
      const obj_action: {
        [key: number]: () => void;
      } = {
        1: () => {
          const boardData = response.data.data.map(
              (board: { id: number; nameBoard: string }) => ({
                id: board.id,
                nameBoard: board.nameBoard,
              })
          );
          dispatch(boardSlice.actions.setNameBoard(boardData));
        },
        2: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        7: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        9: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      };
      obj_action[response.data.answercode]?.();
    }
  } catch (e) {
    dispatch(
        userSlice.actions.setError("Произошла ошибка при получение доски"),
    );
  }
};

export const deleteBoard =
  (userId: number, boardId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await ax.delete<{
        answercode: number;
        answer: string;
      }>(`/deleteBoard?boardId==${boardId}&userId=${userId}`);
      console.log(response);
      const obj_action: {
        [key: number]: () => void;
      } = {
        1: () => {
          dispatch(boardSlice.actions.removeBoard(boardId));
          console.log(response);
        },
        2: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        7: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        9: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      };
      obj_action[response.data.answercode]?.();
    } catch (e) {
      dispatch(
        userSlice.actions.setError("Произошла ошибка при удалении доски"),
      );
    }
  };

export const renameBoard = (boardId: number, userId: number, boardNewName: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await ax.put<{
      answercode: number;
      answer: string;
    }>(`/renameBoard?boardId=${boardId}&boardNewName=${boardNewName}&userId=${userId}`)
    const obj_action: {
      [key: number]: () => void;
    } = {
      1: () => {},
      2: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      7: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      9: () => dispatch(boardSlice.actions.setError(response.data.answer)),
    }
    obj_action[response.data.answercode]?.();
  } catch (e) {

  }
}
