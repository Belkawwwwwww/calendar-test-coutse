import React, {FC} from 'react';
import {RouteNames} from "../../router";
import styles from "./Navbar.module.sass"
import { useAppSelector} from "../../hooks/redux";
import useModal from "../../hooks/useModal";
import Modal from "../ModalPopup/Modal";

const Navbar: FC = () => {

    const {isOpen, toggle} = useModal();


    return (
        <>
                    <div className={styles.navbar}>
                        <div className={styles.logo}>
                            <a href="/">Logo</a>
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

        </>


    );
};

export default Navbar;