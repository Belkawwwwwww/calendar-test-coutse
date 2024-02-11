import React from "react";
import styles from "./Home.module.sass";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import { isLoggedIn } from "../../store/action/userAction";
import { useAppSelector } from "../../store/hooks/redux";
import { isAuthSelector } from "../../store/slices/UserSlice";

const Home = () => {
  const isAuth = useAppSelector(isAuthSelector);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const word = "YOUR BOARDS ";

  return (
    <>
      {!isLoggedIn() && !isAuth ? (
        <div className={styles.contentNoAuth}>
          <div className={styles.leftContent}>
            <div className={styles.hello}>hello</div>
            <div className={styles.analog}>it's the Trello analog</div>
            <Link to={RouteEnum.LOGIN} className={styles.button}>
              Sign In
            </Link>
          </div>
          <div className={styles.img}>
            <img src="/img/teddy-bear.png" alt="bear" className={styles.bear} />
            <img
              src="/img/creativity.png"
              alt="creative"
              className={styles.creative}
            />
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          {word.split("").map((letter, index) => (
            <Link
              key={index}
              className={styles.link}
              to={RouteEnum.BOARD}
              style={{ color: getRandomColor() }}
            >
              {letter}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
