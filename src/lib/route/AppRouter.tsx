import React from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { isAuthSelector } from "../../store/slices/UserSlice";
import { Navigate, Route, Routes } from "react-router-dom";
import { anotherRoutes, privateRoutes, publicRoutes } from "./index";
import { RouteEnum } from "./RouteEnum";
import LoginPage from "../../pages/auth/Login/LoginPage";
import RegisterPage from "../../pages/auth/Register/RegisterPage";

const AppRouter = () => {
  const isAuth = useAppSelector(isAuthSelector);

  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="/" element={<Navigate to={RouteEnum.BOARD} />} />
          {privateRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
          {publicRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </>
      ) : (
        <>
          <Route path={RouteEnum.LOGIN} element={<LoginPage />} />
          <Route path={RouteEnum.REGISTRATION} element={<RegisterPage />} />
        </>
      )}

      {publicRoutes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}

      {anotherRoutes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
      <Route path="*" element={<Navigate to={RouteEnum.NOTFOUND} />} />
    </Routes>
  );
};


export default AppRouter;
