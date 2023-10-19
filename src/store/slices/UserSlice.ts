import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/models";
import { RootState } from "../index";

export interface UserSlice {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error?: string;
}

const initialState: UserSlice = {
  isAuth: false,
  user: {} as IUser,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
    setUser(state, { payload }: PayloadAction<IUser>) {
      state.user = payload;
    },
    setError(state, { payload }: PayloadAction<string | undefined>) {
      state.error = payload;
    },
    setAuth(state, { payload }: PayloadAction<boolean>) {
      state.isAuth = payload;
    },
  },
});

const _isLoading = (state: RootState) => state.user.isLoading;
const _error = (state: RootState) => state.user.error;
const _user = (state: RootState) => state.user.user;
const _isAuth = (state: RootState) => state.user.isAuth;

export const isLoadingUserSelector = createSelector(
  [_isLoading],
  (state) => state,
);
export const errorUserSelector = createSelector([_error], (state) => state);
export const userDataSelector = createSelector([_user], (state) => state);
export const isAuthSelector = createSelector([_isAuth], (state) => state);
