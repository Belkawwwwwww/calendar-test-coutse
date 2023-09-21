import React from "react";
import Login from "../pages/Login";
import Board from "../pages/Board";
import NotFound from "../pages/NotFound";
import Main from "../pages/Main";
// import Registration from "../components/RegistrationForm/Registration";


export interface IRoute {
    path: string;
    element: React.ReactElement;
}

export enum RouteNames {
    LOGIN = '/login',
    BOARD = '/board',
    // REGISTER = 'register'

}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, element: <Login/>},
    // {path: RouteNames.REGISTER, element: <Registration/>},
    {path: '*', element: <NotFound/>},
    {path: '/', element: <Main/>},
];

export const privateRoutes: IRoute[] = [
    {path: RouteNames.BOARD, element: <Board/>},

];