import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "../Login/Login.module.sass";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import {
  errorUserSelector,
  isLoadingUserSelector,
} from "../../../store/slices/UserSlice";
import { isLoggedIn, register } from "../../../store/action/userAction";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../../lib/route/RouteEnum";

const Registration: FC = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const error = useAppSelector(errorUserSelector);
  const navigate = useNavigate();
  const isLoading = useAppSelector(isLoadingUserSelector);

  if (isLoggedIn()) {
    return <Navigate to={RouteEnum.BOARD} />;
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      username.trim() !== "" ||
      password.trim() !== "" ||
      passwordConfirm.trim() !== ""
    ) {
      await dispatch(register(username, password, passwordConfirm));
      navigate(RouteEnum.BOARD);
    }
  };

  const onHandlerUser = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    }
  };

  return (
    <div
      className={styles.content}
      style={{
        backgroundImage: `url("/img/fon1.png")`,
        backgroundSize: "cover",
      }}
    >
      <div className={styles.form}>
        <form className={styles.btnBox} onSubmit={handleSubmit}>
          <div className={styles.title}>
            <h1 className={styles.title}>REGISTRATION</h1>
          </div>
          <div className={styles.inputBox}>
            {error ? (
              <div
                style={{ color: "black", margin: "10px", textAlign: "center" }}
              >
                {error}
              </div>
            ) : null}
            <label className={styles.icon} htmlFor="username">
              <img src="/img/icon-user.svg" alt="user" />
            </label>
            <input
              value={username}
              onChange={onHandlerUser}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password" className={styles.icon}>
              <img src="/img/icon-password.svg" alt="password" />
            </label>
            <input
              value={password}
              onChange={onHandlerUser}
              type="password"
              name="password"
              id="psw-1"
              placeholder="Password"
              required
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password" className={styles.icon}>
              <img src="/img/icon-password.svg" alt="password" />
            </label>
            <input
              value={passwordConfirm}
              onChange={onHandlerUser}
              type="password"
              name="passwordConfirm"
              id="psw-2"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className={styles.btnBox}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className={styles.loader}></div>
              ) : (
                "Registration"
              )}
            </button>
          </div>
        </form>
        <div className={styles.subtitle}>
          <Link to={RouteEnum.LOGIN} className={styles.link}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
