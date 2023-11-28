import React from "react";
import styles from "./styles.module.sass";

const NotFound = () => {
  return (
    <div
      className={styles.content}
      style={{
        backgroundImage: `url("/img/NotFound.png")`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.titleNotFound}>404</div>
      <div className={styles.subtitle}>Page not found</div>
      <div className={styles.contentNotFound}>
        The page you are looking for doesn't exist or has been moved.
      </div>
    </div>
  );
};

export default NotFound;
