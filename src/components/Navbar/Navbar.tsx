import React, {FC} from 'react';
import {RouteNames} from "../../router";
import styles from "./Navbar.module.sass"
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {authSlice} from "../../store/slices/authSlice";

const Navbar: FC = () => {

    //const {isOpen, toggle} = useModal();
    const dispatch = useAppDispatch()
    const {username, isAuthenticated} = useAppSelector(state => state.authReducer)

    const logoutHandler = (e: any) => {
        e.preventDefault()
        dispatch(authSlice.actions.logout())
    }

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <a href="/">Logo</a>
                </div>
                <div className={styles.links}>
                    {
                        !isAuthenticated
                            ?
                            <>
                                <a
                                    onClick={() => (RouteNames.LOGIN)}
                                    href="/login"
                                >
                                    Login
                                </a>

                            </>

                            : <>
                                <span>{username}</span>
                                <button>
                                    Создать доску
                                </button>
                                <button
                                    type="button"
                                    onClick={logoutHandler}
                                >
                                    выйти
                                </button>
                            </>

                    }

                </div>
            </div>

        </>


    );
};

export default Navbar;