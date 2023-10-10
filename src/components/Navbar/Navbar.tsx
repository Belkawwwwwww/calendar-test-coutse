import React, {FC, useState} from "react";
import {RouteNames} from "../../router";
import styles from "./Navbar.module.sass";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {isAuthSelector} from "../../store/slices/UserSlice";
import {logout} from "../../store/action/userAction";
import {useNavigate} from "react-router-dom";
import Modal from "../Modal/modal";

const Navbar: FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(isAuthSelector);
    const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(logout());
    navigate("/");
  };
    const closeModal = () => {
        setShowModal(false)
    }

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
              <button className={styles.btnCreate} onClick={() => {
                  setShowModal(true)
              }}>Создать доску
              </button>
              <Modal active={showModal} onClose={closeModal}>
                  <label htmlFor="name">Название доски</label>
                  <input
                      type="text"
                  />
              </Modal>
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