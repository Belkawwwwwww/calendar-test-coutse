import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    users: IUser[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
            state.error = ''

        },
        removeUsers(state) {},
    }
})



export default userSlice.reducer;