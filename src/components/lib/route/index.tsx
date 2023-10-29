import React, { JSX } from "react";
import { RouteEnum } from "./RouteEnum";
import LoginPage from "../../../pages/auth/Login/LoginPage";
import RegisterPage from "../../../pages/auth/Register/RegisterPage";
import Home from "../../../pages/Home/Home";
import Board from "../../../pages/Board/Board";
import NotFound from "../../../pages/NotFound";

type Route = {
  path: string;
  element: JSX.Element;
};

export const publicRoutes: Route[] = [
  {
    path: RouteEnum.HOME,
    element: <Home />,
  },
  {
    path: RouteEnum.LOGIN,
    element: <LoginPage />,
  },
  {
    path: RouteEnum.REGISTRATION,
    element: <RegisterPage />,
  },
  {
    path: RouteEnum.NOTFOUND,
    element: <NotFound />,
  },
];

export const privateRoutes: Route[] = [
  {
    path: RouteEnum.BOARD,
    element: <Board />,
  },
  {
    path: RouteEnum.NOTFOUND,
    element: <NotFound />,
  },
];

export const anotherRoutes: Route[] = [
  {
    path: RouteEnum.NOTFOUND,
    element: <NotFound />,
  },
];
