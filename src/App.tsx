import React, { FC, useEffect } from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import { useAppDispatch } from "./store/hooks/redux";
import AppRouter from "./lib/route/AppRouter";
import { checkAuth } from "./store/action/userAction";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const id = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (id) {
      dispatch(checkAuth(id));
      console.log(checkAuth);
    }
  }, [id]); // eslint-disable-line

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
