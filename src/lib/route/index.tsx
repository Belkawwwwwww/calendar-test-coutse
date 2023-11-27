import React from "react";
import { Navigate } from "react-router-dom";
import { RouteEnum } from "./RouteEnum";
import LoginPage from "../../pages/auth/Login/LoginPage";
import RegisterPage from "../../pages/auth/Register/RegisterPage";
import Board from "../../pages/Board/Board";
import NotFound from "../../pages/NotFound/NotFound";
import BoardPage from "../../pages/Boardpage/BoardPage";
import Home from "../../pages/Home/Home";

type IRoute = {
  path: string;
  element: React.ReactNode;
};

export const publicRoutes: IRoute[] = [
  {
    path: RouteEnum.LOGIN,
    element: <LoginPage />,
  },
  {
    path: RouteEnum.REGISTRATION,
    element: <RegisterPage />,
  },
  { path: RouteEnum.NOTFOUND, element: <Navigate to="/login" /> },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteEnum.BOARD,
    element: <Board />,
  },
  {
    path: `${RouteEnum.BOARD}/:boardId`,
    element: <BoardPage />,
  },
  {
    path: RouteEnum.HOME,
    element: <Home />,
  },
  { path: RouteEnum.NOTFOUND, element: <NotFound /> },
];

export const anotherRoutes: IRoute[] = [
  {
    path: RouteEnum.NOTFOUND,
    element: <NotFound />,
  },
];
