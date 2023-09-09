import React, {FC} from 'react';
import styles from "./LoginForm.module.sass"
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../../router";

const LoginForm: FC = () => {

    const router = useNavigate()


    return (
        <div className={styles.form}>
            <div className={styles.content}>

                <form action="" className={styles.btnBox}>
                    <h1 className={styles.title}>User Login</h1>
                    <div className={styles.inputBox}>
                        <label className={styles.icon} htmlFor="username">
                            <img src="/img/icon-user.svg" alt="user"/>
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="password" className={styles.icon}>
                            <img src="/img/icon-password.svg" alt="password"/>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className={styles.btnBox}>
                        <button

                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className={styles.subtitle}>
                    <Link
                        className={styles.link}
                        to={'/register'}
                    >
                        Registration
                    </Link>
                </div>


            </div>

        </div>

    );
};

export default LoginForm;