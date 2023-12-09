import React, { FC, useEffect, useState } from "react";
import styles from "./Board.module.sass";
import { useAppSelector } from "../../store/hooks/redux";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../lib/route/RouteEnum";
import { userDataSelector } from "../../store/slices/UserSlice";
import ax from "../../utils/axios";
import { IBoard, IResponse } from "../../lib/types";

const Board: FC = () => {
  const user = useAppSelector(userDataSelector);
  const [boards, setBoards] = useState<IBoard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBoard();
  }, []); // eslint-disable-line
  const handleSubmit = (boardId: number) => {
    const existingBoard = boards.filter((board) => board.id === boardId);
    if (existingBoard.length) {
      navigate(`${RouteEnum.BOARD}/${boardId}`);
      console.log("BoardId:", boardId);
    } else {
      navigate(RouteEnum.NOTFOUND);
    }
  };
  const getBoard = async () => {
    try {
      const response = await ax.get<IResponse>(`/getBoard`);
      setBoards(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.allBoard}>
          <div className={styles.content}>
            <div className={styles.user}>
              {user ? user.username : null} : Ваши созданные доски
            </div>
            <div className={styles.section}>
              <div className={styles.create}>
                {!boards || boards.length === 0 ? (
                  <div
                    className={styles.createBoard}
                    style={{ color: "black" }}
                  >
                    Нет созданных досок
                  </div>
                ) : (
                  boards.map((board) => {
                    if (board.id) {
                      return (
                        <div
                          key={board.id}
                          className={styles.createBoard}
                          onClick={() => handleSubmit(board.id)}
                          style={{ backgroundColor: getRandomColor() }}
                        >
                          {board.name_board}
                        </div>
                      );
                    }
                    return null;
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
