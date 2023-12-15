import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import RenameBoardButton from "../Button/BoardButton/RenameBoardButton/RenameBoardButton";
import { useAppSelector } from "../../store/hooks/redux";
import { isBoardsSelector } from "../../store/slices/BoardSlice";
import { IBoard } from "../../lib/types";

interface RenameBoardProps {
  boardId: number;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}

const RenameBoard: FC<RenameBoardProps> = ({ boardId, setBoards }) => {
  const boards = useAppSelector(isBoardsSelector);

  return (
    <div className={styles.delete_board}>
      {boards?.map((board) => {
        if (board.id === Number(boardId)) {
          return (
            <RenameBoardButton
              key={board.id}
              boardId={board.id}
              setBoards={setBoards}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default RenameBoard;
