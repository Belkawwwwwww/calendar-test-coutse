import { AppDispatch } from "../index";
import ax from "../../utils/axios";
import { ICard, IResponse } from "../../lib/types";
import { cardSlice } from "../slices/CardSlice";

export const createCard =
  (nameCard: string, boardId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await ax.post<IResponse<ICard>>(`/createСard`, {
        nameCard: nameCard,
        boardId: boardId,
      });
      const cardId = response.data.data?.id;
      if (cardId || response.status) {
        dispatch(cardSlice.actions.addCard(response.data.data!));
      }
    } catch (e) {}
  };

export const getCard =
  (boardId: number) =>
  async (dispatch: AppDispatch): Promise<ICard[]> => {
    try {
      const response = await ax.get<IResponse<ICard[]>>(
        `/getCard?boardId=${boardId}`,
      );
      const obj_action: {
        [key: number]: () => void;
      } = {
        200: () => {
          if (response.data?.data !== undefined) {
            const cardData = response.data.data;
            dispatch(cardSlice.actions.setCard(cardData));
          }
        },
      };
      obj_action[response.data.statusCode]?.();
      return response.data?.data || [];
    } catch (e) {
      throw e;
    }
  };
