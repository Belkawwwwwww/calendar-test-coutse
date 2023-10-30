import React, { FC, useEffect, useState } from "react";
import styles from "./Navbar.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import {
  errorUserSelector,
  isAuthSelector,
  userSlice,
} from "../../store/slices/UserSlice";
import { logout } from "../../store/action/userAction";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/modal";
import { create } from "../../store/action/createBoard";
import { isModalOpenSelector, modalSlice } from "../../store/slices/ModalSlice";


const Navbar: FC = () => {
  const [nameBoard, setNameBoard] = useState<string>("");
  const [isModalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);
  const navigate = useNavigate();
  const error = useAppSelector(errorUserSelector);
  const isModalOpen = useAppSelector(isModalOpenSelector);


  const handleModalOpen = () => {
    dispatch(modalSlice.actions.setIsModalOpen(true));
    setModalActive(true);
  };
  const handleModalClose = () => {
    setModalActive(false);
    dispatch(modalSlice.actions.setIsModalOpen(false));
    dispatch(userSlice.actions.setError(undefined));
  };

  const handleSubmit = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSubmitModal = () => {
    if (nameBoard) {
      dispatch(create(nameBoard));
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      setNameBoard("");
      setModalActive(false);
    }
  }, [isModalOpen]);
  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameBoard(e.target.value);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/">Logo</a>
      </div>
      <div className={styles.links}>
        {!isAuth ? (
          <div className={styles.link}>
            <a href="/login">Login</a>
            <a href="/registration">Sign up</a>
          </div>
        ) : (
          <div className={styles.btnBox}>
            <div className={styles.leftNav}>
              <button>Рабочие пространства</button>
              <button className={styles.btnCreate} onClick={handleModalOpen}>
                Создать
              </button>
              {isModalActive && (
                <Modal
                  title="Название доски"
                  onClose={handleModalClose}
                  onClick={handleSubmitModal}
                  disabled={!nameBoard}
                  //onChange={onHandlerModal}
                >
                  <input
                      value={nameBoard}
                      className={styles.inputModal}
                      type="text"
                      onChange={onHandlerModal}
                      required
                  />
                  {error && (
                    <div
                      style={{ color: "red", margin: "10px", width: "40px" }}
                    >
                      {error}
                    </div>
                  )}
                </Modal>
              )}
            </div>
            <div className={styles.rightNav}>
              <label htmlFor="search" className={styles.icon}>
                <img src="/img/search.svg" alt="" />
              </label>
              <input className={styles.input} type="text" placeholder="Поиск" />
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
