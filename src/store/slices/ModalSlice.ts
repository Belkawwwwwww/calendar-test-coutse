import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface ModalSlice {
  isModalOpen: boolean;
}

const initialState: ModalSlice = {
  isModalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.isModalOpen = payload;
    },
  },
});

const _isOpenModal = (state: RootState) => state.modal.isModalOpen;

export const isModalOpenSelector = createSelector(
  [_isOpenModal],
  (state) => state,
);
