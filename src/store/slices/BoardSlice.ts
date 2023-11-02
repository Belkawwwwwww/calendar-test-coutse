import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface BoardSlice {
  nameBoard: string[];
}

const initialState: BoardSlice = {
  nameBoard: [],
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setNameBoard(state, { payload }: PayloadAction<string[]>) {
      state.nameBoard = payload;
    },
  },
});

const _nameBoard = (state: RootState) => state.boards.nameBoard;

export const isNameBoardSelector = createSelector(
  [_nameBoard],
  (nameBoard) => nameBoard,
);
