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

//
// export const boardCardsSelector = (state: RootState, boardId: number) => {
//   return state.cards.cards?.filter((card) => card.board_id === boardId);
// };


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

    setError(state, { payload }: PayloadAction<string | undefined>) {
      state.error = payload;
    },
  },
});

const _boards = (state: RootState) => state.boards.boards ?? [];
const _error = (state: RootState) => state.boards.error;

export const isBoardsSelector = createSelector([_boards], (state) => state);
export const errorBoardSelector = createSelector([_error], (state) => state);

export const {
  setBoards,
  addBoard,
  renameBoard,
  removeBoard,
  setError,
} = boardSlice.actions;
export default boardSlice.reducer