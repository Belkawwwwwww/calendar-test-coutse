import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./Login.module.sass";
import { isLoggedIn, login } from "../../../store/action/userAction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import { errorUserSelector } from "../../../store/slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../../lib/route/RouteEnum";

const LoginPage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorUserSelector);
  const navigate = useNavigate();
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login(username, password));
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(RouteEnum.BOARD);
    }
  }, [isLoggedIn()]); // eslint-disable-line

  const onHandlerUser = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  useEffect(() => {
    if (!isAnimationDone) {
      setIsAnimationDone(true);
    }
  }, []); // eslint-disable-line

  return (
    <div
      className={styles.content}
      style={{
        backgroundImage: `url("/img/fon1.png")`,
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
            <button type="submit">Sign In</button>
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
