import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface ModalSlice {
  isModalOpen: boolean;
  nameBoard: string;
}

const initialState: ModalSlice = {
  isModalOpen: false,
  nameBoard: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.isModalOpen = payload;
    },
    setNameBoard(state, { payload }: PayloadAction<string>) {
      state.nameBoard = payload;
    },
  },
});

const _isOpenModal = (state: RootState) => state.modal.isModalOpen;
const _nameBoard = (state: RootState) => state.modal.nameBoard;

export const isModalOpenSelector = createSelector(
  [_isOpenModal],
  (state) => state,
);
export const nameBoard = createSelector([_nameBoard], (state) => state);
