import React from "react";
import Login from "../pages/Login";
import ChoiceBoard from "../pages/ChoiceBoard";
import Board from "../pages/Board";


export interface IRoute {
    path: string;
    element: React.ReactElement;
}

export enum RouteNames {
    LOGIN = '/login',
    CHOICE = '/choice',
    BOARD = '/board'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, element: <Login/>},
    {path: '*', element: <Login/>},
    {path: '/', element: <Login/>}
];

export const privateRoutes: IRoute[] = [
    {path: RouteNames.CHOICE, element: <ChoiceBoard/>},
    {path: RouteNames.BOARD, element: <Board/>},

];