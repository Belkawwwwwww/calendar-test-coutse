import React, {FC} from 'react';
import {useAppSelector} from "../store/hooks/redux";
import {isAuthSelector} from "../store/slices/UserSlice";
import {Outlet, Navigate} from "react-router-dom"

interface IProps {
    redirectPath?: string
}

const PrivateRoute: FC<IProps> = ({redirectPath}) => {
    const isAuth = useAppSelector(isAuthSelector);
    return isAuth ? <Outlet/> : <Navigate to={redirectPath} replace={}/>
};

export default PrivateRoute;