import React, {FC} from 'react';

const Registration: FC = () => {
    return (
        <div className="registration-wrapper">
            <form action="">
                <h1>Create your account</h1>
                <label htmlFor="">
                    <input type="text" placeholder="Login"/>
                </label>
                <label htmlFor="">
                    <input type="password" placeholder="Password"/>
                </label>
                <label htmlFor="">
                    <input type="confirmPassword" placeholder="Confirm Password"/>
                </label>
            </form>
        </div>
    );
};

export default Registration;