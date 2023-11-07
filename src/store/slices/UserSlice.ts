import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IUser } from "../../lib/types";

export interface UserSlice {
  isAuth: boolean;
  user: IUser | null;
  isLoading: boolean;
  error?: string;
}

const initialState: UserSlice = {
  isAuth: false,
  user: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
    setError(state, { payload }: PayloadAction<string | undefined>) {
      state.error = payload;
    },
    setIsAuth(state, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload;
    },
    setUser(state, {payload}: PayloadAction<IUser | null>) {
      state.user = payload;
    },
  },
});

const _isLoading = (state: RootState) => state.user.isLoading;
const _error = (state: RootState) => state.user.error;
const _isAuth = (state: RootState) => state.user.isAuth;
const _user = (state: RootState) => state.user.user

export const isLoadingUserSelector = createSelector(
  [_isLoading],
  (state) => state,
);
export const errorUserSelector = createSelector([_error], (state) => state);
export const userDataSelector = createSelector([_user], (state) => state);
export const isAuthSelector = createSelector([_isAuth], (state) => state);

