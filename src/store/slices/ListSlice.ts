import { IList } from "../../lib/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface ListSlice {
  lists: IList[] | null;
  error?: string;
}

const initialState: ListSlice = {
  lists: null,
};

export const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setLists(state, { payload }: PayloadAction<IList[] | null>) {
      state.lists = payload;
    },
    addList(state, { payload }: PayloadAction<IList>) {
      if (state.lists) {
        state.lists.push(payload);
      } else {
        state.lists = [payload];
      }
    },
    removeList(state, { payload }: PayloadAction<number>) {
      if (state.lists) {
        state.lists = state.lists.filter((list) => list.id !== payload);
      }
    },
    setContent(state, {payload}: PayloadAction<{listId: number, content: string}>) {
      if (state.lists) {
        const listIndex = state.lists.findIndex((list) => list.id === payload.listId)
        if (listIndex !== -1) {
          state.lists[listIndex].content= payload.content
        }
      }
    }
  },
});

const _lists = (state: RootState) => state.lists.lists ?? [];

export const isListSelector = createSelector([_lists], (state) => state);
