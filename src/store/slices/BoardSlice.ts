import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface BoardSlice {
  nameBoard: string[];
  error?: string;
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
    setError(state, { payload }: PayloadAction<string | undefined>) {
      state.error = payload;
    },
  },
});

const _nameBoard = (state: RootState) => state.boards.nameBoard;
const _error = (state: RootState) => state.boards.error;

export const isNameBoardSelector = createSelector(
  [_nameBoard],
  (nameBoard) => nameBoard,
);
export const errorBoardSelector = createSelector([_error], (state) => state);

