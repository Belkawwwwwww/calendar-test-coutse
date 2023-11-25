import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICards } from "../../lib/types";

export interface CardSlice {
  cards: ICards[] | null;
  error?: string;
}

const initialState: CardSlice = {
  cards: null,
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCars(state, { payload }: PayloadAction<ICards[] | null>) {
      state.cards = payload;
    },
  },
});

// const _cards = (state: RootState) => state.cards.cards;

// export const isCardsSelector = createSelector([_cards], (state) => state);