import React, { FC } from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import { anotherRoutes, privateRoutes, publicRoutes } from "./index";
import { isLoggedIn } from "../../store/action/userAction";
import { useAppSelector } from "../../store/hooks/redux";
import { isAuthSelector } from "../../store/slices/UserSlice";
import Board from "../../pages/Board";
import Registration from "../../pages/auth/Register/RegisterPage";
import LoginPage from "../../pages/auth/Login";
import Home from "../../pages/Home/Home";
import NotFound from "../../pages/NotFound/NotFound";
import {RouteEnum} from "./RouteEnum";
import BoardPage from "../../pages/Boardpage";


const AppRouter: FC = () => {
  const isAuth = useAppSelector(isAuthSelector);
  const navigate = useNavigate()

  return (
    <Routes>
      {isLoggedIn() || isAuth ? (
          <>
            <Route path="/board" element={<Board />} />
            <Route path="*" element={<NotFound/>} />
            <Route path="/" element={<Home/>}/>
            {/*<Route path="/*" element={<Navigate to="/board" />} />*/}
            <Route path={`${RouteEnum.BOARD}/:boardId`} element={<BoardPage/>}/>

          </>

      ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/" element={<Home/>}/>
          </>

      )}
      {/*{anotherRoutes.map((route) => (*/}
      {/*  <Route path={route.path} element={route.element} key={route.path} />*/}
      {/*))}*/}
    </Routes>
  );
};

export default AppRouter;
