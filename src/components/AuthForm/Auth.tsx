import React, {FC, FormEvent, MouseEvent, useState} from 'react';
import styles from "./Auth.module.sass"
import {IAuth} from "../../models/models";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {login, register} from "../../store/actionCreators";


const Auth: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState<IAuth>({
        password: '',
        username: '',
        confirmPassword: ''
    })

    const isFormValid = () => {
        return form.password.trim().length && form.username.trim().length
    }

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            await dispatch(register(form))
            navigate("/")
        } else {
            alert("Form is invalid")
        }
    }
    const loginHandler = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (isFormValid()) {
            await dispatch(login(form))
            navigate("/")
        } else {
            alert("Form is invalid")
        }
    }

    const changeHandler = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const [showRegister, setShowRegister] = useState(false)


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
                            id="username"
                            onChange={changeHandler}
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
                            onChange={changeHandler}
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
                                    id="password"
                                    onChange={changeHandler}
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
                                onClick={loginHandler}
                                type="submit"
                            >
                                Sign In
                            </button>
                        ) : (
                            <button
                                onClick={loginHandler}
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