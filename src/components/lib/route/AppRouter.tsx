import React from "react";
import { useAppSelector } from "../../../store/hooks/redux";
import { isAuthSelector } from "../../../store/slices/UserSlice";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./index";

const AppRouter = () => {
  const isAuth = useAppSelector(isAuthSelector);
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
  // <Routes>
  //   {anotherRoutes.map((route) => (
  //     <Route path={route.path} element={route.element} key={route.path} />
  //   ))}
  // </Routes>
};

export default AppRouter;
