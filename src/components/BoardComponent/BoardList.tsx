import React from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import { useAppSelector } from "../../store/hooks/redux";
import { isBoardsSelector } from "../../store/slices/BoardSlice";

const BoardList = () => {
  const boards = useAppSelector(isBoardsSelector);
  const getRandomColor = () => {
    const pastelColors = [
      "#92DEFF",
      "#C5E3A5",
      "#FDFF8D",
      "#FECDFF",
      "#EAEAEA",
      "#CCFF9C",
      "#CDEDFF",
    ];
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  };
  return (
    <div className={styles.board_list}>
      <Link to={RouteEnum.BOARD} className={styles.my_board}>
        Мои доски:{" "}
      </Link>
      <div className={styles.board_list}>
        {!boards || boards.length === 0 ? (
          <div className={styles.createBoard}>Нет досок</div>
        ) : (
          boards.map((board) => (
            <Link
              to={`/board/${board.id}`}
              className={styles.createBoard}
              key={board.id}
              style={{ backgroundColor: getRandomColor() }}
            >
              {board.name_board}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default BoardList;
