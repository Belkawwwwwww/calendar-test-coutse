import React, {FC, useState} from 'react';
import styles from "./Auth.module.sass"
import {IAuth} from "../../models/models";



const Auth: FC = () => {
    const [formValue, setFormValue] = useState<IAuth>({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const {username, password} = formValue

    const handleChange = () => {};


    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

    }

    const loginHandler = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
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
                            value={username}
                            id="username"
                            onChange={handleChange}
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
                            value={password}
                            id="password"
                            onChange={handleChange}
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className={styles.btnBox}>
                        <button
                            onClick={(e: any) => loginHandler}
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

export default Auth;