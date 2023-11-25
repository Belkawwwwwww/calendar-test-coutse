import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { userSlice } from "../slices/UserSlice";
import { IResponse } from "../../lib/types";






export const renameBoard =
  (boardId: number, boardNewName: string) => async (dispatch: AppDispatch) => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      const response = await ax.put<IResponse>(
        `/renameBoard?boardId=${boardId}&boardNewName=${boardNewName}&userId=${userId}`,
      );
      const obj_action: {
        [key: number]: () => void;
      } = {
        // 1: () => {},
        // 2: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        // 7: () => dispatch(boardSlice.actions.setError(response.data.answer)),
        // 9: () => dispatch(boardSlice.actions.setError(response.data.answer)),
      };
      obj_action[response.data.answercode]?.();
    } catch (e) {}
  };
