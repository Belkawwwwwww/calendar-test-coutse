import React, {FC, useState} from 'react';
import styles from "../LoginForm/Auth.module.sass";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {errorUserSelector} from "../../store/slices/UserSlice";
import {register} from "../../store/action/userAction";


const Registration: FC = () => {

    const dispatch = useAppDispatch()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const error = useAppSelector(errorUserSelector)


    const submit = (e: any) => {
        e.preventDefault();
        if (username && password && passwordConfirm) dispatch(register(username, password, passwordConfirm))
    }


    return (
        <div className={styles.content}>
            <div className={styles.form}>
                <form
                    action=""
                    className={styles.btnBox}
                    onSubmit={submit}
                >
                    <h1 className={styles.title}>Registration</h1>
                    {error && <div style={{color: 'red', margin: '10px'}}>
                        {error}
                    </div>}
                    <div className={styles.inputBox}>
                        <label className={styles.icon} htmlFor="username">
                            <img src="/img/icon-user.svg" alt="user"/>
                        </label>
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="password" className={styles.icon}>
                            <img src="/img/icon-password.svg" alt="password"/>
                        </label>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            id="psw-1"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="password" className={styles.icon}>
                            <img src="/img/icon-password.svg" alt="password"/>
                        </label>
                        <input
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)}
                            type="password"
                            name="passwordConfirm"
                            id="psw-2"
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <div className={styles.btnBox}>
                        <button type="submit">Register</button>
                    </div>
                </form>
                <div className={styles.subtitle}>
                    <a
                        className={styles.link}
                        href={'/login'}
                    >
                        Log In
                    </a>
                </div>
            </div>

        </div>
    );
};

export default Registration;