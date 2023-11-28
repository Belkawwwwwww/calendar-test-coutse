import React from "react";
import styles from "./Home.module.sass";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";

const Home = () => {
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
  );
};

export default Home;
