import React, {FC, useEffect} from "react";
import "./styles/App.sass";
import Navbar from "./components/Navbar/Navbar";
import {useAppDispatch} from "./store/hooks/redux";
import {userSlice} from "./store/slices/UserSlice";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./utils/router/privateRoute";
import Board from "./pages/Board";
import AuthRootComponent from "./pages/auth";
import Home from "./pages/Home";

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
      if (localStorage.getItem("isAuth")) {
      dispatch(userSlice.actions.setAuth(true));
    }
  }, [dispatch]);

  return (
      <>
          <Navbar/>
          <Routes>
              <Route element={<Navbar/>}/>
              <Route element={<PrivateRoute/>}>
                  <Route path="/board" element={<Board/>}/>
              </Route>
              <Route path="/" element={<Home/>}/>
              <Route path="login" element={<AuthRootComponent/>}/>
              <Route path="register" element={<AuthRootComponent/>}/>
          </Routes>
      </>

  );
};

export default App;
