import React, { useState } from "react";
import styles from "./dr.module.sass";

interface Item {
  id: number;
  title: string;
}

interface Board {
  id: number;
  title: string;
  items: Item[];
}

const Drag = () => {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      title: "Сделать",
      items: [
        { id: 1, title: "Пойти в магазин" },
        { id: 2, title: "Выкинуть мусор" },
      ],
    },
    {
      id: 2,
      title: "Сделала",
      items: [
        { id: 4, title: "Купить корм" },
        { id: 5, title: "Купить еду" },
      ],
    },
    {
      id: 3,
      title: "Купить",
      items: [
        { id: 7, title: "Пойти в кино" },
        { id: 8, title: "Выкинуть " },
      ],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
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
    board: Board,
    item: Item,
  ) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove(styles.itemShadow);
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: Board,
    item: Item,
  ) => {
    e.preventDefault();
    const sourceIndex = currentBoard!.items.findIndex(
      (i) => i.id === currentItem!.id,
    );
    const targetIndex = board.items.findIndex((i) => i.id === item.id);

    currentBoard!.items[sourceIndex] = item;
    board.items[targetIndex] = currentItem!;

    setBoards((prevBoards) => [...prevBoards]);
  };

  const dropCardHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: Board,
  ) => {
    if (currentItem) {
      const sourceIndex = currentBoard!.items.findIndex(
        (i) => i.id === currentItem!.id,
      );
      currentBoard!.items.splice(sourceIndex, 1);
      board.items.push(currentItem!);

      setBoards((prevBoards) => [...prevBoards]);
    }
  };

  return (
    <div className={styles.app}>
      {boards.map((board) => (
        <div
          key={board.id}
          className={styles.board}
          onDragOver={dragOverHandler}
          onDrop={(e) => dropCardHandler(e, board)}
        >
          <div className={styles.board_title}>{board.title}</div>
          {board.items.map((item) => (
            <div
              key={item.id}
              onDragOver={dragOverHandler}
              onDragLeave={dragLeaveHandler}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={dragEndHandler}
              onDrop={(e) => dropHandler(e, board, item)}
              className={styles.item}
              draggable
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Drag;
