import React, {FC} from 'react';
import {RouteNames} from "../../router";
import styles from "./Navbar.module.sass"
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {isAuthSelector} from "../../store/slices/UserSlice";
import {logout} from "../../store/action/userAction";

const Navbar: FC = () => {

    //const {isOpen, toggle} = useModal();
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(isAuthSelector)

    const submit = () => {
        dispatch(logout())
    }


    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.logo}>
                    <a href="/">Logo</a>
                </div>
                <div className={styles.links}>
                    {
                        !isAuth
                            ?
                            <div className={styles.link}>
                                <a
                                    onClick={() => (RouteNames.LOGIN)}
                                    href="/login"
                                >
                                    Login
                                </a>

                            </div>

                            : <>
                                <span></span>
                                <button>
                                    Создать доску
                                </button>
                                <button
                                    onClick={submit}
                                    type="button"
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