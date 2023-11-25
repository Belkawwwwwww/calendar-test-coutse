import React, { FC, useEffect, useState } from "react";
import styles from "./Board.module.sass";
import { useAppSelector } from "../../store/hooks/redux";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import { userDataSelector } from "../../store/slices/UserSlice";
import ax from "../../utils/axios";
import { IBoard, IResponse } from "../../lib/types";

const Board: FC = () => {
  const user = useAppSelector(userDataSelector);
  const userId = Number(localStorage.getItem("userId"));
  const [boards, setBoards] = useState<IBoard[]>([]);

  useEffect(() => {
    getBoard();
  }, []); // eslint-disable-line

  const getBoard = async () => {
    try {
      const response = await ax.get<IResponse>(`/getBoard?userId=${userId}`);
      console.log(response.data);
      setBoards(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.leftNavbar}>
          <div className={styles.lists}>
            <div className={styles.list}>
              <img src="/img/board.svg" alt="board" />
              <Link to={RouteEnum.BOARD} className={styles.listA}>
                Доски
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.allBoard}>
          <div className={styles.content}>
            <div className={styles.user}>
              {user ? user.username : null} : Ваши созданные доски
            </div>
            <div className={styles.section}>
              <div className={styles.create}>
                {!boards || boards.length === 0 ? (
                  <div className={styles.createBoard}></div>
                ) : (
                  boards.map((board) => {
                    if (board.boardId) {
                      return (
                        <Link
                          key={board.boardId}
                          to={`/board/${board.boardId}`}
                          className={styles.createBoard}
                        >
                          {board.nameBoard}
                        </Link>
                      );
                    }
                    return (
                      <div key={board.boardId} className={styles.createBoard}>
                        {board.nameBoard}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
