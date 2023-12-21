import React, { FC } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import CreateCardButton from "../Button/CardButton/GetCardButton/CreateCardButton";
import { useAppSelector } from "../../store/hooks/redux";
import { isBoardsSelector } from "../../store/slices/BoardSlice";

interface CreateCardProps {
  boardId: number;
}

const CreateCard: FC<CreateCardProps> = ({ boardId }) => {
  const boards = useAppSelector(isBoardsSelector);

  return (
    <div className={styles.createCard}>
      {boards?.map((board) => {
        if (board.id === Number(boardId)) {
          return <CreateCardButton key={board.id} boardId={board.id} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default CreateCard;
