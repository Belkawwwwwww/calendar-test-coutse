import React, {FC, useState} from 'react';
import styles from "./Auth.module.sass"
import {IAuth} from "../../models/models";
import {useLoginUserMutation} from "../../service/authApi";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";


const Auth: FC = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {login, error} = useAppSelector(state => state.auth)


    const [formValue, setFormValue] = useState<IAuth>({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const {username, password, confirmPassword} = formValue
    const [showRegister, setShowRegister] = useState(false)
    const [
        loginUser,
        {
            data: loginData,
            isSuccess: isLoginSuccess,
            error: loginError,
        },
        ] = useLoginUserMutation();


    const handleChange = (e: any) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    };


    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

    }

    const handleLogin = async () => {
        if(username && password) {
            await loginUser({username, password})
        } else {
            alert("Form is valid")
        }
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
                    <h1 className={styles.title}>
                        {!showRegister ? "User Login" : "Registration"}
                    </h1>
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
                    {showRegister && (
                        <>
                            <div className={styles.inputBox}>
                                <label htmlFor="password" className={styles.icon}>
                                    <img src="/img/icon-password.svg" alt="password"/>
                                </label>
                                <input
                                    value={confirmPassword}
                                    id="password"
                                    onChange={handleChange}
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>

                        </>
                    )}
                    <div className={styles.btnBox}>
                        {!showRegister ? (
                            <button
                                onClick={() => handleLogin}
                                type="submit"
                            >
                                Sign In
                            </button>
                        ) : (
                            <button
                                onClick={(e: any) => handleLogin}
                                type="submit"
                            >
                                Register
                            </button>
                        )}

                    </div>
                </form>
                <div className={styles.subtitle}>
                    {!showRegister ? (
                        <p
                            className={styles.link}
                            onClick={() => setShowRegister(true)}
                        >
                            Registration
                        </p>
                    ) : (
                        <p
                            className={styles.link}
                            onClick={() => setShowRegister(false)}
                        >
                            Login
                        </p>

                    )}

                </div>


            </div>

        </div>

    );
};

export default Auth;