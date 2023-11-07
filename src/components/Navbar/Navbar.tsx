import React, { FC } from "react";
import styles from "./Navbar.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { isAuthSelector } from "../../store/slices/UserSlice";
import { logout } from "../../store/action/userAction";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import CreateButton from "./CreateButton";

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(logout());
    navigate(RouteEnum.LOGIN);
  };

  return (
    <div className={styles.header}>
      <Logo />
      <div className={styles.links}>
        {!isAuth ? (
          <div className={styles.link}>
            <Link to={RouteEnum.LOGIN}>Login</Link>
            <Link to={RouteEnum.REGISTRATION}>Sign up</Link>
          </div>
        ) : (
          <div>
            <div className={styles.leftNav}>
              <button>Рабочие пространства</button>
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
  );
};

export default Navbar;
