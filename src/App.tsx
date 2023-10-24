import React, {FC, useEffect, useState} from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import { useAppDispatch } from "./store/hooks/redux";
import { userSlice } from "./store/slices/UserSlice";
import AppRouter from "./components/lib/route/AppRouter";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "./store/action/userAction";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");


  // useEffect(() => {
  //   if (localStorage.getItem("user_id")) {
  //     dispatch(userSlice.actions.setAuth(true));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    if (user_id) {
      dispatch(checkAuth(user_id));
    } else {
      navigate("/login")
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
