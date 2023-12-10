import React, { FC } from "react";
import styles from "./styles.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { isAuthSelector } from "../../store/slices/UserSlice";
import {isLoggedIn, logout} from "../../store/action/userAction";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import Logo from "../UI/Logo/Logo";
import SearchBar from "../UI/SearchBar/SearchBar";
import CreateBoardButton from "../Button/BoardButton/CreateBoardButton/CreateBoardButton";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);

  const handleSubmit = () => {
    dispatch(logout());
  };

  return (
    <div className={`${styles.header} ${isLoggedIn() ? styles.auth : styles.unauth}`}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.links}>
          {!isLoggedIn() ? (
            <div className={styles.link}>
              <div className={styles.menuLog}>
                <img
                  className={styles.accountLogo}
                  src="/img/account.svg"
                  alt=""
                />
                <div className={styles.dropdownContent}>
                  <Link className={styles.menuLink} to={RouteEnum.LOGIN}>
                    Login
                  </Link>
                  <Link className={styles.menuLink} to={RouteEnum.REGISTRATION}>
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.menu}>
              <div className={styles.leftNav}>
                <CreateBoardButton />
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
