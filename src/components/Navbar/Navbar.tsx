import React, {FC} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {RouteNames} from "../../router";
import styles from "./Navbar.module.sass"

const Navbar: FC = () => {

    const router = useNavigate()
    const auth = false;

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <span>Logo</span>
            </div>
            <div className={styles.links}>
                <div className={styles.link}>
                    <a
                        href="/login"
                    >
                        Login
                    </a>
                    <a href="/choice">Choice</a>
                    <a href="/board">Board</a>
                </div>
            </div>
        </div>

    );
};

export default Navbar;