import React, {FC, useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { isBoardSelector } from "../../store/slices/BoardSlice";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import Drag from "../../components/DragAndDrop/Drag";
import { deleteBoard } from "../../store/action/boardAction";
import { IBoard } from "../../lib/types";

const BoardPage: FC = () => {
  const user = useAppSelector(userDataSelector);
  const boards = useAppSelector(isBoardSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null); // Используется для создания состояния, которое хранит выбранную доску (selectedBoard)
  const userId = Number(localStorage.getItem("userId"));


  const handleBoardClick = (boardId: number) => {
    const selected = boards?.find((board) => board.id === boardId);
    setSelectedBoard(selected || null);
    navigate(`/board/${boardId}`);
  };
  const handleDeleteBoard = (boardId: number, userId: number) => {
    dispatch(deleteBoard(userId, boardId));
    console.log( boardId)
  };

  useEffect(() => {
    if (boards && boards.length > 0) {
      setSelectedBoard(boards[0]);
    }
  }, [boards]);

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
              <button className={styles.delete_board}>
                Изменить название доски
              </button>
              <button className={styles.delete_board} onClick={() => handleDeleteBoard(selectedBoard?.id ?? 0, userId ?? 0)}

              >Удалить доску</button>
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