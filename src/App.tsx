import React, { FC, useEffect } from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import {useAppDispatch, useAppSelector} from "./store/hooks/redux";
import AppRouter from "./lib/route/AppRouter";
import { checkAuth, isLoggedIn } from "./store/action/userAction";
import { getBoard } from "./store/action/BoardAction";
import {isAuthSelector} from "./store/slices/UserSlice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);


  useEffect(() => {
    dispatch(checkAuth());
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