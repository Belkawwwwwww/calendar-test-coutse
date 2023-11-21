import React, { FC, useEffect } from "react";
import styles from "./Board.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { getBoard } from "../../store/action/boardAction";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import { userDataSelector } from "../../store/slices/UserSlice";
import { isBoardSelector } from "../../store/slices/BoardSlice";

const Board: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userDataSelector);
  const navigate = useNavigate();
  const boards = useAppSelector(isBoardSelector);

  useEffect(() => {
    dispatch(getBoard());
  }, []); // eslint-disable-line

  const handleBoardClick = (boardId: number) => {
    if (boardId) {
      navigate(`/board/${boardId}`);
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
                  <div className={styles.createBoard}>Нет доступных досок</div>
                ) : (
                  boards.map((board) => (
                    <div
                      onClick={() => handleBoardClick(board.id)}
                      className={styles.createBoard}
                      key={board.id}
                    >
                      {board.nameBoard}
                    </div>
                  ))
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
