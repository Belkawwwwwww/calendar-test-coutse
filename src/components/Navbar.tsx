import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {RouteNames} from "../routes";

const Navbar: FC = () => {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <span>Logo</span>
            </div>
            <div className="navbar-links">
                <div className="navbar-links-link">
                    <a href="/login">Login</a>
                    <a href="/choice">Choice</a>
                    <a href="/board">Board</a>
                </div>
            </div>
        </div>

    );
};

export default Navbar;