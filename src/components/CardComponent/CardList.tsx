import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import BurgerCard from "../Button/CardButton/BurgerCard/BurgerCard";
import { useAppSelector } from "../../store/hooks/redux";
import { isCardSelector } from "../../store/slices/CardSlice";
import { ICard } from "../../lib/types";

interface CardListProps {
  boardId: number;
  setCards: Dispatch<SetStateAction<ICard[]>>;
}

const CardList: FC<CardListProps> = ({ boardId, setCards }) => {
  const cards = useAppSelector(isCardSelector);
  const handleDeleteCard = (cardId: number) => {
    setCards((prevCards) => {
      return prevCards.filter((card) => card.id !== cardId);
    });
  };

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
                        onDeleteCard={handleDeleteCard}
                      />
                    </div>
                  </div>
                  <div className={styles.footerCard}>
                    <img
                      className={styles.plusCard}
                      src="/img/Plus.svg"
                      alt="+"
                    />
                    <div> Добавить карточку</div>
                  </div>
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
