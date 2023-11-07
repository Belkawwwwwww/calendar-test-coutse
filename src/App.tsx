import React, { FC, useEffect } from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import { useAppDispatch } from "./store/hooks/redux";
import AppRouter from "./lib/route/AppRouter";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "./store/action/userAction";
import { RouteEnum } from "./lib/route/RouteEnum";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (id) {
      dispatch(checkAuth(id));
    } else {
      navigate(RouteEnum.LOGIN);
    }
  }, [id]); // eslint-disable-line
  //
  // useEffect(() => {
  //   if (isAuth && location.pathname.includes('/registration')) {
  //     navigate('/');
  //   } else if (!isAuth && !location.pathname.includes('/login')) {
  //     navigate('/login');
  //   }
  // }, [isAuth, location, navigate]);

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
