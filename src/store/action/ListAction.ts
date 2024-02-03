import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { IList, IResponse } from "../../lib/types";
import { listSlice } from "../slices/ListSlice";
import { userSlice } from "../slices/UserSlice";

export const createList =
  (board_id: number, card_id: number, title: string, content: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await ax.post<IResponse<IList>>(`/list/create`, {
        board_id: board_id,
        card_id: card_id,
        title: title,
        content: content,
      });
      const listId = response.data.data?.id;
      if (listId || response.status) {
        dispatch(listSlice.actions.addList(response.data.data!));
      }
    } catch (e) {
      console.log(e);
    }
  };

export const getList =
  (boardId: number) =>
  async (dispatch: AppDispatch): Promise<IList[]> => {
    try {
      const response = await ax.get<IResponse<IList[]>>(
        `/lists?boardId=${boardId}`,
      );
      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          if (response.data?.data !== undefined) {
            const listData = response.data.data;
            dispatch(listSlice.actions.setLists(listData));
          }
        },
      };
      obj_action[response.data.statusCode]?.();
      return response.data?.data || [];
    } catch (e) {
      throw e; // Пробрасываем ошибку для дальнейшей обработки
    }
  };

export const getContentList =
  (listId: number) =>
  async (dispatch: AppDispatch): Promise<IList[]> => {
    try {
      const response = await ax.get<IResponse<IList[]>>(
        `/list?listId=${listId}`,
      );
      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          if (response.data?.data !== undefined) {
            const listData = response.data.data;
            dispatch(listSlice.actions.setLists(listData));
          }
        },
      };
      obj_action[response.data.statusCode]?.();
      return response.data?.data || [];
    } catch (e) {
      throw e;
    }
  };

export const deleteList = (listId: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await ax.delete<IResponse>(`/list?listId=${listId}`);
    console.log(response);
    const obj_action: {
      [key: number]: () => void;
    } = {
      200: () => {
        dispatch(listSlice.actions.removeList(listId));
      },
    };
    obj_action[response.data.statusCode]?.();
  } catch (e) {
    dispatch(userSlice.actions.setError("Произошла ошибка при удалении доски"));
  }
};

export const renameList = (listId: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await ax.put<IResponse>(`/list/update?listId=${listId}`);
    const obj_action: {
      [key: number]: () => void;
    } = {
      200: () => {
        console.log("Название доски изменено");
      },
    };
    obj_action[response.data.statusCode]?.();
  } catch (e) {
    console.log(e);
  }
};
