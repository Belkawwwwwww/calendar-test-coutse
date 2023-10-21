import React from "react";
import { useAppSelector } from "../store/hooks/redux";
import { isAuthSelector } from "../store/slices/UserSlice";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/auth/Login/LoginPage";
import RegisterPage from "../pages/auth/Register/RegisterPage";
import Board from "../pages/Board/Board";
import { Route, Routes } from "react-router-dom";

export interface IRoute {
  path: string;
  element: React.ReactElement;
}

export const public_routes: IRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];

export const privateRoutes: IRoute[] = [{ path: "/board", element: <Board /> }];

const AppRouter = () => {
  const isAuth = useAppSelector(isAuthSelector);

  return !isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      {public_routes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {public_routes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
