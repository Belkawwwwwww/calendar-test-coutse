import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/strore";
import {bindActionCreators} from "redux";
import {allActionCreator} from "../store/reducers/all-action-creators";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActionCreator, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;