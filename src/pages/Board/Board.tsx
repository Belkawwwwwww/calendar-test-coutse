import React, { FC, useState } from "react";
import styles from "./Board.module.sass";
import { useAppSelector } from "../../store/hooks/redux";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import { userDataSelector } from "../../store/slices/UserSlice";
import { isBoardsSelector } from "../../store/slices/BoardSlice";

const Board: FC = () => {
  const user = useAppSelector(userDataSelector);
  const boards = useAppSelector(isBoardsSelector);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 200);

  const handleSubmit = (boardId: number) => {
    const existingBoard = boards.filter((board) => board.id === boardId);
    if (existingBoard.length) {
      navigate(`${RouteEnum.BOARD}/${boardId}`);
    } else {
      navigate(RouteEnum.NOTFOUND);
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.allBoard}>
          <div className={styles.content}>
            <div className={styles.section}>
              {loading ? (
                <div className={styles.loader}>Загрузка...</div>
              ) : (
                <div>
                  <div className={styles.user}>
                    {user ? user.username : null} : Ваши созданные доски
                  </div>
                  <div className={styles.create}>
                    {!boards || boards.length === 0 ? (
                      <div className={styles.createBoard}>Нет досок</div>
                    ) : (
                      boards.map((board) => (
                        <div
                          onClick={() => handleSubmit(board.id)}
                          className={styles.createBoard}
                          key={board.id}
                          style={{ backgroundColor: getRandomColor() }}
                        >
                          {board.name_board}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
