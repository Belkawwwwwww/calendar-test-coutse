import React, { FC } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import RenameBoardButton from "../Button/BoardButton/RenameBoardButton/RenameBoardButton";
import { useAppSelector } from "../../store/hooks/redux";
import { isBoardsSelector } from "../../store/slices/BoardSlice";

interface RenameBoardProps {
  boardId: number;
}

const RenameBoard: FC<RenameBoardProps> = ({ boardId }) => {
  const boards = useAppSelector(isBoardsSelector);

  return (
    <div className={styles.delete_board}>
      {boards?.map((board) => {
        if (board.id === Number(boardId)) {
          return <RenameBoardButton key={board.id} boardId={board.id} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default RenameBoard;
