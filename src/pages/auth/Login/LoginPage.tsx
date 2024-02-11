import React, { FC, FormEvent, useEffect } from "react";
import styles from "./styles.module.sass";
import { isLoggedIn, login } from "../../../store/action/userAction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import {
  errorUserSelector,
  isLoadingUserSelector,
  userSlice,
} from "../../../store/slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../../lib/route/RouteEnum";
import { useLoginForm } from "../../../store/hooks/custom-hooks/useLoginForm";

const LoginPage: FC = () => {
  const {
    username,
    password,
    showPassword,
    handleToggleShowPassword,
    onHandlerUser,
  } = useLoginForm();
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorUserSelector);
  const isLoading = useAppSelector(isLoadingUserSelector);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(userSlice.actions.resetError());
  }, []); // eslint-disable-line
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() !== "" || password.trim() !== "") {
      await dispatch(login(username, password));
      if (isLoggedIn()) {
        navigate(RouteEnum.BOARD);
      }
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
              className={styles.inputLogin}
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
            <div className={styles.passwordInputWrapper}>
              <input
                value={password}
                id="password"
                onChange={onHandlerUser}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                required
              />
              <div
                className={styles.passwordToggle}
                onClick={handleToggleShowPassword}
              >
                <img
                  src={
                    showPassword ? "/img/icon_eyeOpen.svg" : "/img/icon_eye.svg"
                  }
                  alt={showPassword ? "Hide" : "Show"}
                />
              </div>
            </div>
          </div>
          <div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? <div className={styles.loader}></div> : "Sign In"}
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
