import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { anotherRoutes, privateRoutes, publicRoutes } from "./index";
import { isLoggedIn } from "../../store/action/userAction";
import { useAppSelector } from "../../store/hooks/redux";
import { isAuthSelector } from "../../store/slices/UserSlice";

const AppRouter: FC = () => {
  const isAuth = useAppSelector(isAuthSelector);

  return (
    <Routes>
      {isLoggedIn() || isAuth ? (
        <>
          {privateRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
          {publicRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </>
      ) : (
        <>
          {publicRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </>
      )}
      {anotherRoutes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
