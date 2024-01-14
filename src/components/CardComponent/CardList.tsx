import React, { FC } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import BurgerCard from "../Button/CardButton/BurgerCard/BurgerCard";
import { useAppSelector } from "../../store/hooks/redux";
import { isCardSelector } from "../../store/slices/CardSlice";
import CreateListButton from "../Button/ListButton/CreateListButton/CreateListButton";

interface CardListProps {
  boardId: number;
  // cardId: number
}

const CardList: FC<CardListProps> = ({ boardId }) => {
  const cards = useAppSelector(isCardSelector);

  return (
    <div className={styles.cards}>
      {cards &&
        cards.map((card) => {
          if (card.id && card.board_id === Number(boardId)) {
            return (
              <div className={styles.btnGetFile} key={card.id}>
                <div>
                  <div className={styles.contentCard}>
                    <div className={styles.contentHeaderCard}>
                      {card.card_name}
                    </div>
                    <div>
                      <BurgerCard
                        boardId={card.board_id}
                        cardId={card.id}
                        nameCard={card.card_name}
                      />
                    </div>
                  </div>
                  <CreateListButton boardId={boardId} />
                </div>
              </div>
            );
          }
          return null;
        })}
      {/*<Drag />*/}
    </div>
  );
};

export default CardList;
