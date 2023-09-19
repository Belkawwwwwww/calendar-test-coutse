import React, {FC} from 'react';
import {RouteNames} from "../../router";
import styles from "./Navbar.module.sass"
import {useActions, useAppSelector} from "../../hooks/redux";
import useModal from "../../hooks/useModal";
import Modal from "../ModalPopup/Modal";

const Navbar: FC = () => {

    const {isAuth} = useAppSelector(state => state.auth)
    const {logout} = useActions()
    const {isOpen, toggle} = useModal();


    return (
        <>
            {
                isAuth
                    ?
                    <div className={styles.navbar}>
                        <div className={styles.logo}>
                            <span>Logo</span>
                        </div>
                        <div className={styles.links}>
                            <div className={styles.link}>
                                <button
                                    onClick={toggle}
                                >
                                    Создать доску
                                </button>
                                <Modal isOpen={isOpen} toggle={toggle}></Modal>
                                <button
                                    type="button"
                                    onClick={logout}
                                >
                                    выйти
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={styles.navbar}>
                        <div className={styles.logo}>
                            <span>Logo</span>
                        </div>
                        <div className={styles.links}>
                            <div className={styles.link}>
                                <a
                                    onClick={() => (RouteNames.LOGIN)}
                                    href="/login"
                                >
                                    Login
                                </a>

                            </div>
                        </div>
                    </div>
            }
        </>


    );
};

export default Navbar;