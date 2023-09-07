import React, {FC, useState} from 'react';


const LoginForm: FC = () => {


    return (
        <div className="form">
            <div className="form__content">
                <h1 className="form__title">User Login</h1>
                <form action="" className="form__form-box form-box">
                    <div className="form-box__input-box input-box">
                        <label className="input-box__icon" htmlFor="username">
                            <img src="/img/icon-user.svg" alt="user"/>
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                        />
                    </div>
                    <div className="form-box__input-box input-box">
                        <label htmlFor="password" className="input-box__icon">
                            <img src="/img/icon-password.svg" alt="password"/>
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-box__btn-box btn-box">
                        <button type="submit">Sign In</button>
                    </div>
                </form>
                <p className="form__subtitle">
                    <a href="" className="form__link">Registration</a>
                </p>
            </div>

        </div>

    );
};

export default LoginForm;