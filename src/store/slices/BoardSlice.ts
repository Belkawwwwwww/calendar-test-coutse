import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IBoard } from "../../lib/types";

export interface BoardSlice {
  boards: IBoard[] | null;
  error?: string;
}

const initialState: BoardSlice = {
  boards: null,
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setNameBoard(state, { payload }: PayloadAction<IBoard[] | null>) {
      state.boards = payload;
    },
    setError(state, { payload }: PayloadAction<string | undefined>) {
      state.error = payload;
    },
  },
});

const _boards = (state: RootState) => state.boards.boards;
const _error = (state: RootState) => state.boards.error;

export const isNameBoardSelector = createSelector(
  [_boards],
  (boards) => boards,
);
export const errorBoardSelector = createSelector([_error], (state) => state);

