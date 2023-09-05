import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {RouteNames} from "../routes";

const Navbar: FC = () => {
    return (
        <div className="navbar">
            <div className="navbar_container">
                <div className="navbar-logo">
                    <span>Logo</span>
                </div>
                <div className="navbar-links">
                    <div className="navbar-links-link">
                        <a href="">LOGIN</a>
                        <a href="">CHOICE</a>
                        <a href="">BOARD</a>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Navbar;