import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import DeleteButton from "../Button/BoardButton/DeleteBoardButton/DeleteButton";
import { useAppSelector } from "../../store/hooks/redux";
import { isBoardsSelector } from "../../store/slices/BoardSlice";
import {IBoard, ICard} from "../../lib/types";

interface DeleteBoardProps {
  boardId: number;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
  setCards: Dispatch<SetStateAction<ICard[]>>;

}

const DeleteBoard: FC<DeleteBoardProps> = ({ boardId, setBoards, setCards }) => {
  const boards = useAppSelector(isBoardsSelector);

  const handleDeleteBoard = (boardId: number) => {
    setBoards((prevBoards) =>
      prevBoards.filter((board) => board.id !== boardId),
    );
  };
  const handleDeleteCard = (cardId: number) => {
    setCards((prevCards) =>
     prevCards.filter((card) => card.id !== cardId)
  );
  };

  return (
    <div className={styles.delete_board}>
      {boards?.map((board) => {
        if (board.id === Number(boardId)) {
          return (
            <DeleteButton
              key={board.id}
              boardId={board.id}
              nameBoard={board.name_board}
              onDeleteBoard={handleDeleteBoard}
              onDeleteCards={handleDeleteCard}
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
