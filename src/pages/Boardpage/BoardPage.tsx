import React, { FC } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { isBoardSelector } from "../../store/slices/BoardSlice";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";

const BoardPage: FC = () => {
  const user = useAppSelector(userDataSelector);
  const nameBoard = useAppSelector(isBoardSelector);
  const navigate = useNavigate();
  //const boardName = nameBoard ? nameBoard[0].nameBoard : "";

  const handleBoardClick = (boardId: number) => {
    navigate(`/board/${boardId}`);
  };

  return (
    <div className={styles.main_content}>
      <div className={styles.left_nav}>
        <div className={styles.username}>
          {user ? user.username : null} : рабочее пространство
        </div>
        <div className={styles.board_list}>
          <div className={styles.my_board}>Мои доски</div>
          <div className={styles.board_list}>
            {nameBoard ? (
              nameBoard.length > 0 ? (
                nameBoard.map((option) => (
                  <div
                    onClick={() => handleBoardClick(option.id)}
                    className={styles.createBoard}
                    key={option.id}
                  >
                    {option.nameBoard}
                  </div>
                ))
              ) : (
                <div className={styles.createBoard}>Нет доступных досок</div>
              )
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.content_wrapper}>
        <div className={styles.board_content}>
          <div className={styles.header}>
            <div className={styles.board}></div>
            <div className={styles.menu}></div>
          </div>
          <div className={styles.board_canvas}></div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
