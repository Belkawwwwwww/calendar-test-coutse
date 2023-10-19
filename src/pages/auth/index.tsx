import React from "react";
import { useLocation } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";

const AuthRootComponent = () => {
  const location = useLocation();
  return location.pathname === "/login" ? (
    <LoginPage />
  ) : location.pathname === "/register" ? (
    <RegisterPage />
  ) : null;
};

export default AuthRootComponent;
