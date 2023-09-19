import React, {FC, useState} from 'react';
import styles from "../LoginForm/LoginForm.module.sass";
import {useActions} from "../../hooks/redux";
import axios from "axios";


const Registration: FC = () => {

    const {register} = useActions();
    // const {error} = useAppSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const submit = (e: any) => {
        e.preventDefault();
        axios.post('http://localhost:3000/register', {
            username, password, passwordConfirm
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error.message);
            })
        register(username, password, passwordConfirm)
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
                    {/*{error && <div style={{color: 'red', margin: '10px'}}>*/}
                    {/*    {error}*/}
                    {/*</div>}*/}
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