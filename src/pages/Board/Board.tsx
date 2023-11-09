import React, { FC, useEffect } from "react";
import styles from "./Board.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { getBoard } from "../../store/action/boardAction";
import { isNameBoardSelector } from "../../store/slices/BoardSlice";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import { userDataSelector } from "../../store/slices/UserSlice";

const Board: FC = () => {
  const nameBoard = useAppSelector(isNameBoardSelector);
  const id = Number(localStorage.getItem("userId"));
  const dispatch = useAppDispatch();
  const user = useAppSelector(userDataSelector);

  useEffect(() => {
    dispatch(getBoard(id));
  }, [id]); // eslint-disable-line

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
                {nameBoard ? nameBoard.length > 0 ? (
                    nameBoard.map((option) => (
                        <Link
                            to={`/board/${option.id}`}
                            className={styles.createBoard}
                            key={option.id}
                        >
                          {option.nameBoard}
                        </Link>
                    ))
                ): (
                    <div className={styles.createBoard}>Нет доступных досок</div>
                ): null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
