import React, {FC, useState} from 'react';
import {rules} from "../utils/rules";

const LoginForm: FC = () => {


    return (
        <div className="login-wrapper">
            <h1>Login to your Account</h1>
            <form>
                <label>
                    <p>Login</p>
                    <input
                        type="text"
                        required
                    />
                </label>

                <label htmlFor="">
                    <p>Password</p>
                    <input
                        type="password"
                        required
                    />
                </label>

                <div className="">
                    <button type="submit" >
                        Login
                    </button>
                </div>
                <div>
                    <button type="submit" >
                        Create your account
                    </button>
                </div>

            </form>
        </div>
    );
};

export default LoginForm;