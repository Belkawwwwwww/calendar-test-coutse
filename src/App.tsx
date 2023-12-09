import React, { FC, useEffect } from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import { useAppDispatch } from "./store/hooks/redux";
import AppRouter from "./lib/route/AppRouter";
import { checkAuth } from "./store/action/userAction";

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []); // eslint-disable-line

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
