import React, { JSX } from "react";
import { RouteEnum } from "./RouteEnum";
import LoginPage from "../../pages/auth/Login/LoginPage";
import RegisterPage from "../../pages/auth/Register/RegisterPage";
import Board from "../../pages/Board/Board";
import NotFound from "../../pages/NotFound/NotFound";
import { Navigate } from "react-router-dom";

type Route = {
  path: string;
  element: JSX.Element;
};

export const publicRoutes: Route[] = [
  {
    path: RouteEnum.LOGIN,
    element: <LoginPage />,
  },
  {
    path: RouteEnum.REGISTRATION,
    element: <RegisterPage />,
  },
  { path: "*", element: <Navigate to="/login" /> },
];

export const privateRoutes: Route[] = [
  {
    path: RouteEnum.BOARD,
    element: <Board />,
  },
  { path: "*", element: <NotFound /> },
];

export const anotherRoutes: Route[] = [
  {
    path: RouteEnum.NOTFOUND,
    element: <NotFound />,
  },
];
