import React, {FC, useState} from 'react';
import styles from "./LoginForm.module.sass"
import {Link, useNavigate} from "react-router-dom";
import {RouteNames} from "../../router";

const LoginForm: FC = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameDirty, setUsernameDirty] = useState(false)
    const [passwordDirty, setPasswordDirty]= useState(false)
    const [usernameError, setUsernameError] = useState('Не может быть пустым')
    const [passwordError, setPasswordError] = useState('Не может быть пустым')



    return (
        <div className={styles.form}>
            <div className={styles.content}>

                <form action="" className={styles.btnBox}>
                    <h1 className={styles.title}>User Login</h1>
                    <div className={styles.inputBox}>
                        <label className={styles.icon} htmlFor="username">
                            <img src="/img/icon-user.svg" alt="user"/>
                        </label>
                        {(usernameDirty && usernameError) && <div style={{color: 'red'}}>{usernameError}</div>}
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="password" className={styles.icon}>
                            <img src="/img/icon-password.svg" alt="password"/>
                        </label>
                        {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
                        <input
                            type="password"
                            name="password"
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