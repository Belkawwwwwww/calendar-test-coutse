import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { IBoard, IResponse } from "../../lib/types";
import { boardSlice } from "../slices/BoardSlice";

export const createBoard =
  (nameBoard: string) =>
  async (dispatch: AppDispatch): Promise<IResponse<IBoard>> => {
    try {
      const response = await ax.post<IResponse<IBoard>>(`/createBoard`, {
        nameBoard: nameBoard,
      });
      const boardId = response.data.data?.id;
      if (boardId || response.status) {
        dispatch(boardSlice.actions.addBoard(response.data.data!));
      }
      return response.data;
    } catch (e) {
      console.log("Произошла ошибка при создании доски: ", e);
      throw e;
    }
  };

export const getBoard =
  () =>
  async (dispatch: AppDispatch): Promise<IBoard[]> => {
    try {
      const response = await ax.get<IResponse<IBoard[]>>(`/getBoard`);
      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          if (response.data?.data !== undefined) {
            const boardData = response.data.data;
            dispatch(boardSlice.actions.setBoards(boardData));
          }
        },
      };
      obj_action[response.data.statusCode]?.();
      return response.data?.data || []; // Возвращаем тип Promise<IBoard[]> из функции
    } catch (e) {
      console.log("Произошла ошибка при получении досок:", e);
      throw e; // Пробрасываем ошибку для дальнейшей обработки
    }
  };

export const deleteBoard =
  (boardId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await ax.delete<IResponse<IBoard>>(
        `/deleteBoard?boardId=${boardId}`,
      );
      console.log(response);
      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          dispatch(boardSlice.actions.removeBoard(boardId));
        },
      };
      obj_action[response.data.statusCode]?.();
    } catch (e) {
      console.log("Произошла ошибка при удалении доски: ", e);
    }
  };

export const renameBoard =
  (boardId: number, boardNewName: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await ax.put<IResponse<IBoard>>(
        `/renameBoard?boardId=${boardId}&boardNewName=${boardNewName}`,
      );
      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          dispatch(
            boardSlice.actions.renameBoard({
              boardId,
              boardNewName: boardNewName,
            }),
          );
        },
      };
      obj_action[response.data.statusCode]?.();
    } catch (e) {
      console.log("Произошла ошибка при изменении названия доски: ", e);
    }
  };
