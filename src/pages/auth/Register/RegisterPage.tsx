import React, { FC, FormEvent, useEffect } from "react";
import styles from "../Login/styles.module.sass";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import {
  errorUserSelector,
  isLoadingUserSelector,
  userSlice,
} from "../../../store/slices/UserSlice";
import { isLoggedIn, register } from "../../../store/action/userAction";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../../lib/route/RouteEnum";
import { useRegisterForm } from "../../../store/hooks/custom-hooks/useRegisterForm";

const Registration: FC = () => {
  const {
    username,
    password,
    passwordConfirm,
    showPassword,
    handleToggleShowPassword,
    onHandlerUser,
  } = useRegisterForm();
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorUserSelector);
  const navigate = useNavigate();
  const isLoading = useAppSelector(isLoadingUserSelector);
  useEffect(() => {
    dispatch(userSlice.actions.resetError());
  }, []); // eslint-disable-line

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      username.trim() !== "" ||
      password.trim() !== "" ||
      passwordConfirm.trim() !== ""
    ) {
      await dispatch(register(username, password, passwordConfirm));
      if (isLoggedIn()) {
        navigate(RouteEnum.BOARD);
      }
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
              className={styles.inputLogin}
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
            <div className={styles.passwordInputWrapper}>
              <input
                value={password}
                onChange={onHandlerUser}
                type={showPassword ? "text" : "password"}
                name="password"
                id="psw-1"
                placeholder="Password"
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
          <div className={styles.inputBox}>
            <label htmlFor="password" className={styles.icon}>
              <img src="/img/icon-password.svg" alt="password" />
            </label>
            <input
              className={styles.inputLogin}
              value={passwordConfirm}
              onChange={onHandlerUser}
              type={showPassword ? "text" : "password"}
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
