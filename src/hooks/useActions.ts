import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {allActionCreator} from "../store/reducers/all-action-creators";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActionCreator, dispatch);
}