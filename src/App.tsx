import React, { FC, useEffect } from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import { useAppDispatch } from "./store/hooks/redux";
import { userSlice } from "./store/slices/UserSlice";
import AppRouter from "./components/AppRouter";

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      dispatch(userSlice.actions.setAuth(true));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
