import React, { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { isBoardSelector } from "../../store/slices/BoardSlice";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import Drag from "../../components/DragAndDrop/Drag";
import { IBoard } from "../../lib/types";
import { RouteEnum } from "../../lib/route/RouteEnum";
import RemoveButton from "../../components/Button/RemoveButton";

const BoardPage: FC = () => {
  const user = useAppSelector(userDataSelector);
  const boards = useAppSelector(isBoardSelector);
  const navigate = useNavigate();
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null); // Используется для создания состояния, которое хранит выбранную доску (selectedBoard)

  const handleBoardClick = (boardId: number) => {
    const selected = boards?.find((board) => board.id === boardId);
    setSelectedBoard(selected || null);
    navigate(`/board/${boardId}`);
  };

  useEffect(() => {
    if (boards && boards.length > 0) {
      setSelectedBoard(boards[0]);
    } else {
      navigate(RouteEnum.BOARD);
    }
  }, [boards]); // eslint-disable-line

  return (
    <div className={styles.main_content}>
      <div className={styles.left_nav}>
        <div className={styles.username}>
          {user ? user.username : null} : рабочее пространство
        </div>
        <div className={styles.board_list}>
          <div className={styles.my_board}>Мои доски</div>
          <div className={styles.board_list}>
            {boards ? (
              boards.length > 0 ? (
                boards.map((board) => (
                  <div
                    onClick={() => handleBoardClick(board.id)}
                    className={styles.createBoard}
                    key={board.id}
                  >
                    {board.nameBoard}
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
            <div className={styles.menu}>
              {selectedBoard ? (
                <div className={styles.createBoard}>
                  {selectedBoard.nameBoard}
                </div>
              ) : null}
            </div>
            <div className={styles.board}>
              <div className={styles.delete_board}>Изменить название доски</div>
              <div className={styles.delete_board}>
                <RemoveButton />
              </div>
            </div>
          </div>
          <div className={styles.board_canvas}>
            <Drag />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;