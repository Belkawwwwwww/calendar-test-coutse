import { IBoard } from "../../lib/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface BoardSlice {
  boards: IBoard[] | null;
}

const initialState: BoardSlice = {
  boards: null,
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards(state, { payload }: PayloadAction<IBoard[] | null>) {
      state.boards = payload;
    },

    addBoard(state, { payload }: PayloadAction<IBoard>) {
      if (state.boards) {
        state.boards.push(payload);
      } else {
        state.boards = [payload];
      }
    },

    removeBoard(state, { payload }: PayloadAction<number>) {
      if (state.boards) {
        state.boards = state.boards.filter((board) => board.id !== payload);
      }
    },
    renameBoard(
      state,
      { payload }: PayloadAction<{ boardId: number; boardNewName: string }>,
    ) {
      if (state.boards) {
        const { boardId, boardNewName } = payload;
        state.boards = state.boards.map((board) =>
          board.id === boardId ? { ...board, name_board: boardNewName } : board,
        );
      }
    },
  },
});

const _boards = (state: RootState) => state.boards.boards ?? [];

export const isBoardsSelector = createSelector([_boards], (state) => state);
