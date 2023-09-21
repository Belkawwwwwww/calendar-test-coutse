import React, {ChangeEvent, FC, useState} from 'react';
import styles from "./LoginForm.module.sass"
import {useAppDispatch} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {IAuth} from "../../models/models";
import {login, register} from "../../store/actionCreators";


const LoginForm: FC = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState<IAuth>({
        password: '',
        username: ''
    })

    const isFormValid = () => {
        return form.password.trim().length && form.username.trim().length
    }

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isFormValid()) {
            await dispatch(register(form))
            navigate('/')
        } else {
            alert('Form is invalid')
        }
    }

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const loginHandler = async (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (isFormValid()) {
            await dispatch(login(form))
            navigate('/')
        } else {
            alert('Form is invalid')
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

export default LoginForm;