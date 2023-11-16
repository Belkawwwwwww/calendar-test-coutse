import React from "react";
import styles from "./styles.module.sass";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../../lib/route/RouteEnum";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to={RouteEnum.BOARD}>Logo</Link>
    </div>
  );
};

export default Logo;
