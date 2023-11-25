import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { Link } from "react-router-dom";
import Drag from "../../components/DragAndDrop/Drag";
import RemoveButton from "../../components/Button/RemoveBoardButton/RemoveButton";
import GetFileButton from "../../components/Button/GetCardButton/GetFileButton";
import { IBoard, IResponse } from "../../lib/types";
import ax from "../../utils/axios";

const BoardPage: FC = () => {
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
    <div className={styles.main_content}>
      <div className={styles.left_nav}>
        <div className={styles.username}>
          {user ? user.username : null} : рабочее пространство
        </div>
        <div className={styles.board_list}>
          <div className={styles.my_board}>Мои доски: </div>
          <div className={styles.board_list}>
            {boards ? (
              boards.length > 0 ? (
                boards.map((board) => (
                  <Link
                    to={`/board/${board.boardId}`}
                    className={styles.createBoard}
                    key={board.boardId}
                  >
                    {board.nameBoard}
                  </Link>
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
            <div className={styles.menu}></div>
            <div className={styles.board}>
              <div className={styles.delete_board}>Изменить название доски</div>
              <div className={styles.delete_board}>
                {boards.map((board) => (
                  <RemoveButton
                    key={board.boardId}
                    boardId={board.boardId}
                    nameBoard={board.nameBoard}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.board_canvas}>
            {boards.map((board) => (
              <GetFileButton
                key={board.boardId}
                boardId={board.boardId}
                nameBoard={board.nameBoard}
              />
            ))}
            <Drag />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
