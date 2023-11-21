import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { boardSlice } from "../slices/BoardSlice";
import { IResponse } from "../../lib/types";

export const createCard =
  (boardId: number, nameCard: string, content: any) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await ax.post<IResponse>("/createFile", {
        boardId: boardId,
        nameCard: nameCard,
      });
      const obj_action: {
        [key: number]: () => void;
      } = {
        1: () => {},
        2: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        7: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        9: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        11: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      };
      obj_action[response.data.answercode]?.();
    } catch (e) {}
  };

export const getFile = (boardId: number) => async (dispatch: AppDispatch) => {
  try {
    const userId = Number(localStorage.getItem("userId"));
    const response = await ax.get<IResponse>(
      `/getFile?boardId=${boardId}&userId=${userId}`,
    );
    const obj_action: {
      [key: number]: () => void;
    } = {
      1: () => {},
      2: () => {},
      7: () => {},
      9: () => {},
    };
    obj_action[response.data.answercode]?.();
  } catch (e) {}
};

export const deleteFile =
  (fileId: number, boardId: number) => async (dispatch: AppDispatch) => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      const response = await ax.delete<IResponse>(
        `/deleteFile?fileId=${fileId}&boarId=${boardId}&userId=${userId}`,
      );
      const obj_action: {
        [key: number]: () => void;
      } = {
        1: () => {},
        2: () => {},
        7: () => {},
        9: () => {},
        11: () => {},
      };
      obj_action[response.data.answercode]?.();
    } catch (e) {}
  };

export const renameFile =
  (fileId: number, fileNewName: string, boardId: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      const response = await ax.put<IResponse>(
        `/renameFile?fileId=${fileId}&fileNewName=${fileNewName}&boardId=${boardId}&userId=${userId}`,
      );
      const obj_action: {
        [key: number]: () => void;
      } = {
        1: () => {},
        2: () => {},
        7: () => {},
        9: () => {},
        12: () => {},
      };
    } catch (e) {}
  };

export const updateContent =
  (fileId: number, contetn: string, boardId: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      const response = await ax.put<IResponse>(
        `/updateFile?fileId=${fileId}&contetn=${contetn}&boardId=${boardId}&userId=${userId}`,
      );
      const obj_action: {
        [key: number]: () => void;
      } = {
        1: () => {},
        2: () => {},
        7: () => {},
        9: () => {},
        12: () => {},
      };
    } catch (e) {}
  };