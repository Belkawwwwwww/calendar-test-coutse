import React, { FC } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import BurgerCard from "./CardButton/BurgerCard/BurgerCard";
import { useAppSelector } from "../../store/hooks/redux";
import { isCardSelector } from "../../store/slices/CardSlice";
import CreateListButton from "../ListComponent/ListButton/CreateListButton/CreateListButton";
import { isListSelector } from "../../store/slices/ListSlice";
import ListsList from "../ListComponent/ListsList";

interface CardListProps {
  boardId: number;
}

const CardList: FC<CardListProps> = ({ boardId }) => {
  const cards = useAppSelector(isCardSelector);
  const lists = useAppSelector(isListSelector);

  return (
    <div className={styles.cards}>
      {cards
        ? cards.map((card) => {
            if (card.id && card.board_id === Number(boardId)) {
              const cardLists = lists.filter(
                (list) => list.card_id === card.id,
              );
              return (
                <div className={styles.cardContainer} key={card.id}>
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
                      <ListsList cardLists={cardLists} />
                      <CreateListButton boardId={boardId} cardId={card.id} />
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })
        : null}
    </div>
  );
};

export default CardList;