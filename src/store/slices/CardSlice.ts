import { ICard } from "../../lib/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface CardSlice {
  cards: ICard[] | null;
  error?: string;
}

const initialState: CardSlice = {
    cards: null,
};

export const cardSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        setCard(state, { payload }: PayloadAction<ICard[] | null>) {
            state.cards = payload;
        },
        setError(state, {payload} : PayloadAction<string | undefined>) {
            state.error = payload
        },
        addCard(state, {payload} : PayloadAction<ICard>) {
            if (state.cards) {
                state.cards.push(payload)
            } else {
                state.cards = [payload]
            }
        },
        removeCard(state, {payload}: PayloadAction<number>) {
            if (state.cards) {
                state.cards = state.cards.filter((card) => card.id !== payload)
            }
        },
        renameCard(
            state,
            {payload}: PayloadAction<{ cardId: number, cardNewName: string }>,
        ) {
            if (state.cards) {
                const {cardId, cardNewName} = payload
                state.cards = state.cards.map((card) =>
                    card.id === cardId ? {...card, card_name: cardNewName} : card)
            }
        }
    },
});
const _cards = (state: RootState) => state.cards.cards
const _error = (state: RootState) => state.cards.error

export const isCardSelector = createSelector([_cards], (state) => state)
export const errorCardSelector = createSelector([_error], (state) => state);


