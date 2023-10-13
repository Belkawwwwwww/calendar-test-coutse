import React, { FC, useEffect } from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { useAppDispatch } from "./store/hooks/redux";
import { userSlice } from "./store/slices/UserSlice";

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      dispatch(userSlice.actions.setAuth(true));
    }
  }, []);

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
