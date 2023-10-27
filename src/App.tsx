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
  const id = Number(localStorage.getItem("user_id"));

  useEffect(() => {
    if (id) {
      dispatch(checkAuth(id));
    } else {
      navigate("/login");
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
