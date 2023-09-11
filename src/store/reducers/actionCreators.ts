import {AppDispatch} from "../index";
import {IUser} from "../../models/IUser";
import axios from "axios";
import {userSlice} from "./UserSlice";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get<IUser[]>('https://github.com/typicode/json-server')

    } catch (e) {
        
    }
}