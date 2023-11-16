import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { boardSlice } from "../slices/BoardSlice";

export const newFile =
  (nameBoard: string, nameFile: string, content: any) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await ax.post<{ answercode: number; answer: string }>(
        "/createFile",
        {
          nameBoard: nameBoard,
          nameFile: nameFile,
          content: content,
        },
      );
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
