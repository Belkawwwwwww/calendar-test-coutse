import React, {FC} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {RouteNames} from "../../router";
import styles from "./Navbar.module.sass"
import {useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/useActions";

const Navbar: FC = () => {

    const router = useNavigate()
    const auth = false;
    const {isAuth} = useAppSelector(state => state.auth)
    const {logout} = useActions()


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

                            <a href="/choice">Choice</a>
                            <a href="/board">Board</a>
                            <button
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