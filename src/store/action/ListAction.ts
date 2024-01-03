import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { IList, IResponse } from "../../lib/types";
import { listSlice } from "../slices/ListSlice";

export const CreateList =
  (boardId: number, title: string, content: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await ax.post<IResponse<IList>>(`/list/create`, {
        boardId: boardId,
        title: title,
        content: content,
      });
      const listId = response.data.data?.id;
      if (listId || response.status) {
        dispatch(listSlice.actions.addList(response.data.data!));
      }
    } catch (e) {
      console.log(e)
    }
  };
