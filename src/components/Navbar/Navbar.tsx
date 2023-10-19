import React, { FC, useState } from "react";
import styles from "./Navbar.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import {
  errorUserSelector,
  isAuthSelector,
} from "../../store/slices/UserSlice";
import { logout } from "../../store/action/userAction";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/modal";
import { create } from "../../store/action/createBoard";

const Navbar: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nameboard, setNameboard] = useState<string>("");
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthSelector);
  const navigate = useNavigate();
  const error = useAppSelector(errorUserSelector);

  const handleSubmit = () => {
    dispatch(logout());
    navigate("/");
  };

  const submit = () => {
    dispatch(create(nameboard));
    navigate("/board");
  };
  const handler = (e: any) => {
    setNameboard(e.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
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
            <a href="/register">Sign up</a>
          </div>
        ) : (
          <div className={styles.btnBox}>
            <div className={styles.leftNav}>
              <button>Рабочие пространства</button>
              <button>Недавние</button>
              <button>В избранном</button>
              <button
                className={styles.btnCreate}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Создать
              </button>
              <Modal active={showModal} onClose={closeModal} onSubmit={submit}>
                <label htmlFor="name" className={styles.labelModal}>
                  Название доски
                </label>
                <input
                  value={nameboard}
                  className={styles.inputModal}
                  type="text"
                  onChange={handler}
                  required
                />
                {error && (
                  <div style={{ color: "red", margin: "10px" }}>{error}</div>
                )}
              </Modal>
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
