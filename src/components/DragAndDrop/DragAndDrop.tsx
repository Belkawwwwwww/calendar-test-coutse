import React, {useState} from 'react';
import {ICards, IResponseData} from "../../lib/types";
import styles from "./dr.module.sass";
interface Item {
  id: number;
  title: string;
}
interface Cards {
  cardId: number;
  title: string;
  items: Item[];
  boardId: number
  nameCard: string

}
const DragAndDrop = () => {
  const [cards, setCards] = useState<IResponseData>({});
  const [currentBoard, setCurrentBoard] = useState<Cards | null>(null);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget.className === styles.item) {
      e.currentTarget.classList.add(styles.itemShadow);
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(styles.itemShadow);
  };
  const dragStartHandler = (
      e: React.DragEvent<HTMLDivElement>,
      cards: Cards,
      item: Item,
  ) => {
    setCurrentBoard(cards);
    setCurrentItem(item);
  };
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(styles.itemShadow);
  };

  const dropHandler = (
      e: React.DragEvent<HTMLDivElement>,
      cards: Cards,
      item: Item,
  ) => {
    e.preventDefault();
    const sourceIndex = currentBoard!.items.findIndex(
        (i) => i.id === currentItem!.id,
    );
    const targetIndex = cards.items.findIndex((i) => i.id === item.id);

    currentBoard!.items[sourceIndex] = item;
    cards.items[targetIndex] = currentItem!;

    setCards((prevCards) => ({ ...prevCards }));
  };

  const dropCardHandler = (
      e: React.DragEvent<HTMLDivElement>,
      board: Cards,
  ) => {
    if (currentItem) {
      const sourceIndex = currentBoard!.items.findIndex(
          (i) => i.id === currentItem!.id,
      );
      currentBoard!.items.splice(sourceIndex, 1);
      board.items.push(currentItem!);

      setCards((prevCards) => ({ ...prevCards }));
    }
  };
  return (
        <div className={styles.app}>
          {Object.values(cards).map((boardData: Cards[]) =>
              boardData.map((card: Cards) => (
                  <div key={card.cardId}>
                    <div>Card ID: {card.cardId}</div>
                    <div className={styles.btnGetFile}>Name: {card.nameCard}</div>
                  </div>
              )),
          )}
        </div>
    );
};

export default DragAndDrop;