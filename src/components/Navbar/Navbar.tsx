import React, { FC } from "react";
import { RouteNames } from "../../router";
import styles from "./Navbar.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { isAuthSelector } from "../../store/slices/UserSlice";
import { logout } from "../../store/action/userAction";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  //const {isOpen, toggle} = useModal();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/">Logo</a>
      </div>
      <div className={styles.links}>
        {!isAuth ? (
          <div className={styles.link}>
            <a onClick={() => RouteNames.LOGIN} href="/login">
              Login
            </a>
          </div>
        ) : (
          <div className={styles.btnBox}>
            <button className={styles.btnCreate}> Создать доску</button>
            <button
              onClick={handleSubmit}
              type="button"
              className={styles.btnlogOut}
            >
              Выйти
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;