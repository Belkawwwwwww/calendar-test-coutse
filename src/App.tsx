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
  const id = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (id) {
      dispatch(checkAuth(id));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, id]);

  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
};

export default App;
