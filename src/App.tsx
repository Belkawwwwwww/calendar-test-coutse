import React, { FC, useEffect } from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import { useAppDispatch, useAppSelector } from "./store/hooks/redux";
import AppRouter from "./lib/route/AppRouter";
import { checkAuth, isLoggedIn } from "./store/action/userAction";
import { getBoard } from "./store/action/BoardAction";
import { isAuthSelector } from "./store/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "./lib/route/RouteEnum";

const App: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);
  const sessionUsername = sessionStorage.getItem("username");

  useEffect(() => {
    dispatch(checkAuth()).then((data) => {
      const backendUsername = data?.username;
      if (sessionUsername && backendUsername !== sessionUsername) {
        navigate(RouteEnum.LOGIN);
      }
    });
    if (isLoggedIn() || isAuth) {
      dispatch(getBoard());
    } else {
      console.log("User is not authenticated");
    }
  }, [isLoggedIn()]); // eslint-disable-line

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
