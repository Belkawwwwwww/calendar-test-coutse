import React, { FC } from "react";
import styles from "./styles.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { isAuthSelector } from "../../store/slices/UserSlice";
import { logout } from "../../store/action/userAction";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import Logo from "../UI/Logo/Logo";
import SearchBar from "../UI/SearchBar/SearchBar";
import CreateButton from "../Button/CreateButton/CreateButton";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);

  const handleSubmit = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.links}>
          {!isAuth ? (
            <div className={styles.link}>
              <Link to={RouteEnum.LOGIN}>Login</Link>
              <Link to={RouteEnum.REGISTRATION}>Sign up</Link>
            </div>
          ) : (
            <div className={styles.menu}>
              <div className={styles.leftNav}>
                <CreateButton />
              </div>
              <div className={styles.rightNav}>
                <SearchBar />
                <button
                  onClick={handleSubmit}
                  type="button"
                  className={styles.btnlogOut}
                >
                  Выйти
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
