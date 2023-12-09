import React, { FC, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../components/Button/DeleteBoardButton/DeleteButton";
import CreateCardButton from "../../components/Button/GetCardButton/CreateCardButton";
import { IBoard, ICard, IResponse } from "../../lib/types";
import ax from "../../utils/axios";
import { RouteEnum } from "../../lib/route/RouteEnum";
import RenameBoardButton from "../../components/Button/RenameBoardButton/RenameBoardButton";

const BoardPage: FC = () => {
  const user = useAppSelector(userDataSelector);
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const gif =
    "https://framerusercontent.com/images/lUWZ2z9geAGbpdf0JvpDsbZM3ww.gif";

  useLayoutEffect(() => {
    const getBoard = async (): Promise<IBoard[]> => {
      try {
        const responseBoard = await ax.get<IResponse>("/getBoard");
        console.log(responseBoard.data);
        console.log(responseBoard.data.data);
        return responseBoard.data.data || [];
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    const getCard = async (): Promise<ICard[]> => {
      try {
        const responseCard = await ax.get<IResponse>("/getCard");
        console.log(responseCard.data);
        return responseCard.data.data || [];
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    Promise.all([getBoard(), getCard()]) //асинхронная отправка двух запросов одновременно
      .then(([boardData, cardData]) => {
        setBoards(boardData);
        setCards(cardData);
        const existingBoard = boardData.filter(
          (board) => board.id === Number(boardId),
        );
        if (!existingBoard.length) {
          navigate(RouteEnum.BOARD);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate(RouteEnum.BOARD);
      });
  }, [boardId]); // eslint-disable-line

  const handleDeleteBoard = (boardId: number) => {
    setBoards((prevBoards) => {
      if (prevBoards.length === 1) {
        navigate(RouteEnum.BOARD);
      }
      return prevBoards.filter((board) => board.id !== boardId);
    });
  };
  const handleUpdateCards = (newCard: ICard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const getRandomColor = () => {
    const pastelColors = [
      "#92DEFF",
      "#C5E3A5",
      "#FDFF8D",
      "#FECDFF",
      "#EAEAEA",
      "#CCFF9C",
      "#CDEDFF",
    ];
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  };

  return (
    <div className={styles.main_content}>
      <div className={styles.left_nav}>
        <div className={styles.username}>
          <img className={styles.gif} src={gif} alt="gg" />
        </div>
        <div className={styles.board_list}>
          <Link to={RouteEnum.BOARD} className={styles.my_board}>
            Мои доски:{" "}
          </Link>
          <div className={styles.board_list}>
            {boards ? (
              boards.length > 0 ? (
                boards.map((board) => (
                  <Link
                    to={`/board/${board.id}`}
                    className={styles.createBoard}
                    key={board.id}
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    {board.name_board}
                  </Link>
                ))
              ) : (
                <div className={styles.createBoard}>Нет досок</div>
              )
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.content_wrapper}>
        <div className={styles.board_content}>
          <div className={styles.header}>
            <div>{user ? user.username : null}</div>
            <div className={styles.menu}></div>
            <div className={styles.board}>
              <div className={styles.delete_board}>
                {boards?.map((board) => {
                  if (board.id === Number(boardId)) {
                    return (
                      <RenameBoardButton
                        key={board.id}
                        boardId={board.id}
                        setBoards={setBoards}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
              <div className={styles.delete_board}>
                {boards?.map((board) => {
                  if (board.id === Number(boardId)) {
                    return (
                      <DeleteButton
                        key={board.id}
                        boardId={board.id}
                        nameBoard={board.name_board}
                        onDeleteBoard={handleDeleteBoard}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
          <div className={styles.board_canvas}>
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
            <div className={styles.cards}>
              {cards &&
                cards.map((card) => {
                  if (card.id && card.board_id === Number(boardId)) {
                    return (
                      <div className={styles.btnGetFile} key={card.id}>
                        {card.card_name}
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
