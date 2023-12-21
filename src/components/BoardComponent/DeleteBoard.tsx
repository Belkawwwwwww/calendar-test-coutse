import React, { FC } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import DeleteButton from "../Button/BoardButton/DeleteBoardButton/DeleteButton";
import { useAppSelector } from "../../store/hooks/redux";
import { isBoardsSelector } from "../../store/slices/BoardSlice";

interface DeleteBoardProps {
  boardId: number;
}

const DeleteBoard: FC<DeleteBoardProps> = ({ boardId }) => {
  const boards = useAppSelector(isBoardsSelector);

  return (
    <div className={styles.delete_board}>
      {boards?.map((board) => {
        if (board.id === Number(boardId)) {
          return (
            <DeleteButton
              key={board.id}
              boardId={board.id}
              nameBoard={board.name_board}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default DeleteBoard;
