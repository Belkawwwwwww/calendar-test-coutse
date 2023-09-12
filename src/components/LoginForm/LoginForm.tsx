import React, {FC, useState} from 'react';
import styles from "./LoginForm.module.sass"
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/useActions";


const LoginForm: FC = () => {

    const {login} = useActions()
    const {error} = useAppSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = (e: any) => {
        e.preventDefault();
        login(username, password)
    }

    return (
        <div className={styles.form}>
            <div className={styles.content}>

                <form
                    action=""
                    className={styles.btnBox}
                    onSubmit={submit}
                >

                    <h1 className={styles.title}>User Login</h1>
                    {error && <div style={{color: 'red'}}>
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
                            placeholder="Password"
                            required
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