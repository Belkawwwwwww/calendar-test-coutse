import React, { FC } from "react";
import styles from "./styles.module.sass";
import { useAppDispatch } from "../../store/hooks/redux";
import { isLoggedIn, logout } from "../../store/action/userAction";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import Logo from "../UI/Logo/Logo";
import SearchBar from "../UI/SearchBar/index";
import CreateBoardButton from "../BoardComponent/BoardButton/CreateBoardButton/CreateBoardButton";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(logout())
      .then(() => {
        navigate(RouteEnum.LOGIN);
      })
      .catch((error) => {
        console.error("Произошла ошибка при выходе из аккаунта:", error);
      });
  };

  return (
    <div className={`${styles.header}`}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.links}>
          {!isLoggedIn() ? (
            <div>
              <div className={styles.menuLog}>
                <img
                  className={styles.accountLogo}
                  src="/img/account.svg"
                  alt=""
                />
                <div className={styles.dropdownContent}>
                  <Link to={RouteEnum.LOGIN}>Login</Link>
                  <Link to={RouteEnum.REGISTRATION}>Sign up</Link>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.menu}>
              <div className={styles.leftNav}>
                <CreateBoardButton />
              </div>
              <div>
                <SearchBar />
                <button
                  onClick={handleSubmit}
                  type="button"
                  className={styles.btnLogOut}
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
