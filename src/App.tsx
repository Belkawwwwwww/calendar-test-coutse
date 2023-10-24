import React, { FC, useEffect } from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import { useAppDispatch } from "./store/hooks/redux";
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
    if (user_id !== null && !isNaN(Number(user_id))) {
      dispatch(checkAuth(user_id));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
