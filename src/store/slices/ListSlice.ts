import { IList } from "../../lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  },
});
