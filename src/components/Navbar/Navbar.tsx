import React, {FC, useState} from "react";
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
              <a href="/login">
                  Login
              </a>
              <a href="/register">
                  Sign up
              </a>
          </div>
            
        ) : (
          <div className={styles.btnBox}>
              <div className={styles.leftNav}>
                  <button>Рабочие пространства</button>
                  <button>Недавние</button>
                  <button>В избранном</button>
                  <button className={styles.btnCreate} onClick={() => {
                      setShowModal(true)
                  }}>Создать
                  </button>
                  <Modal active={showModal} onClose={closeModal}>
                      <label htmlFor="name" className={styles.labelModal}>Название доски</label>
                      <input
                          className={styles.inputModal}
                          type="text"
                      />
                  </Modal>
              </div>
              <div className={styles.rightNav}>
                  <label htmlFor="search" className={styles.icon}>
                      <img src="/img/search.svg" alt="" />
                  </label>
                  <input
                      className={styles.input}
                      type="text"
                      placeholder="Поиск"
                  />
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