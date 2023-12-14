import { IBoard } from "../../lib/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

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
    setBoard(state, { payload }: PayloadAction<IBoard[] | null>) {
      state.boards = payload;
    },
    addBoard(state, { payload }: PayloadAction<IBoard>) {
      if (state.boards) {
        state.boards.push(payload);
      } else {
        state.boards = [payload];
      }
    },
    // renameBoard(
    //   state,
    //   action: PayloadAction<{ boardId: number; newName: string }>,
    // ) {
    //   const { boardId, newName } = action.payload;
    //   const board = state.boards?.find((board) => board.id === boardId);
    //   if (board) {
    //     board.name_board = newName;
    //   }
    // },
    setError(state, { payload }: PayloadAction<string | undefined>) {
      state.error = payload;
    },
  },
});

const _boards = (state: RootState) => state.boards.boards ?? [];
const _error = (state: RootState) => state.boards.error;

export const isBoardsSelector = createSelector([_boards], (state) => state);
export const errorBoardSelector = createSelector([_error], (state) => state);
