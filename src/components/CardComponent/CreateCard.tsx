import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import CreateCardButton from "../Button/CardButton/GetCardButton/CreateCardButton";
import { useAppSelector } from "../../store/hooks/redux";
import { isBoardsSelector } from "../../store/slices/BoardSlice";
import { ICard } from "../../lib/types";

interface CreateCardProps {
  boardId: number;
  setCards: Dispatch<SetStateAction<ICard[]>>;
}

const CreateCard: FC<CreateCardProps> = ({ boardId, setCards }) => {
  const boards = useAppSelector(isBoardsSelector);
  const handleUpdateCards = (newCard: ICard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  return (
    <div className={styles.createCard}>
      {boards?.map((board) => {
        if (board.id === Number(boardId)) {
          return (
            <CreateCardButton
              key={board.id}
              boardId={board.id}
              updateCards={handleUpdateCards}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default CreateCard;
