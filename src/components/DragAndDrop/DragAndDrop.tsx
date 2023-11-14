import React, { FC, useState } from "react";
import styles from "./style.module.sass";

interface Item {
  id: number;
  content: string;

  board: string;
}

interface Board {
  id: string;
  name: string;
}

const DragAndDrop: FC = () => {
  const [boards, setBoards] = useState<Board[]>([
    { id: "board1", name: "Board 1" },
    { id: "board2", name: "Board 2" },
    { id: "board3", name: "Board 3" },
  ]);

  const [items, setItems] = useState<Item[]>([
    { id: 1, content: "Item 1", board: "board1" },
    { id: 2, content: "Item 2", board: "board1" },
    { id: 3, content: "Item 3", board: "board2" },
  ]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    itemId: number,
  ) => {
    e.dataTransfer!.setData("item", String(itemId));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetBoardId: string,
  ) => {
    const sourceItemId = Number(e.dataTransfer!.getData("item"));

    const updatedItems = items.map((item) => {
      if (item.id === sourceItemId) {
        return { ...item, board: targetBoardId };
      }
      return item;
    });

    setItems(updatedItems);
  };

  return (
    <div className={styles.app}>
      {boards.map((board) => (
        <div key={board.id} className={styles.board}>
          <div className={styles.board_title}>{board.name}</div>
          {items
            .filter((item) => item.board === board.id)
            .map((item) => (
              <div
                className={styles.item}
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, board.id)}
              >
                {item.content}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default DragAndDrop;
