import React, {FC, useState} from 'react';
import styles from "./LoginForm.module.sass"
import {useActions} from "../../hooks/redux";
import axios from "axios";


const LoginForm: FC = () => {

    const {login} = useActions()
    // const {error} = useAppSelector(state => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = (e: any) => {
        e.preventDefault();
        axios.post('http://localhost:3000/register', {
            username, password
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error.message);
            })

        login(username, password)
    }

    return (
        <div className={styles.content}>
            <div className={styles.form}>
                <form
                    method="post"
                    action=""
                    className={styles.btnBox}
                    onSubmit={submit}
                >

                    <h1 className={styles.title}>User Login</h1>
                    {/*{error && <div style={{color: 'red', margin: '10px'}}>*/}
                    {/*    {error}*/}
                    {/*</div>}*/}
                    <div className={styles.inputBox}>
                        <label className={styles.icon} htmlFor="username">
                            <img src="/img/icon-user.svg" alt="user"/>
                        </label>
                        <input

                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            name="username"
                            placeholder="Username"
                            type="text"
                            required
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="password" className={styles.icon}>
                            <img src="/img/icon-password.svg" alt="password"/>
                        </label>
                        <input
                            id="password"
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
                    <a
                        className={styles.link}
                        href={'/register'}
                    >
                        Registration
                    </a>
                </div>


            </div>

        </div>

    );
};

export default LoginForm;