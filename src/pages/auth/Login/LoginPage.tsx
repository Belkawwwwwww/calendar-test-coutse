import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import styles from "./styles.module.sass";
import { isLoggedIn, login } from "../../../store/action/userAction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import {
  errorUserSelector,
  isLoadingUserSelector,
} from "../../../store/slices/UserSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../../lib/route/RouteEnum";

const LoginPage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorUserSelector);
  const isLoading = useAppSelector(isLoadingUserSelector);
  const navigate = useNavigate();

  if (isLoggedIn()) {
    return <Navigate to={RouteEnum.BOARD} />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() !== "" || password.trim() !== "") {
      await dispatch(login(username, password));
      if (isLoggedIn()) {
        navigate(RouteEnum.BOARD)
      }
    }
  };

  const onHandlerUser = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <div
      className={styles.content}
      style={{
        backgroundImage: "url(/img/fon1.png)",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.form}>
        <form
          method="post"
          action="#"
          className={styles.btnBox}
          onSubmit={handleSubmit}
        >
          <h1 className={styles.title}>USER LOGIN</h1>
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
              autoFocus
              value={username}
              onChange={onHandlerUser}
              id="username"
              name="username"
              placeholder="Username"
              type="text"
              autoComplete="username"
              required
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password" className={styles.icon}>
              <img src="/img/icon-password.svg" alt="password" />
            </label>
            <input
              value={password}
              id="password"
              onChange={onHandlerUser}
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>
          <div className={styles.btnBox}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? <span className={styles.loader}>Загрузка</span> : "Sign In"}
            </button>
          </div>
        </form>
        <div className={styles.subtitle}>
          <Link className={styles.link} to={RouteEnum.REGISTRATION}>
            Registration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
