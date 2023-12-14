import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../components/Button/BoardButton/DeleteBoardButton/DeleteButton";
import CreateCardButton from "../../components/Button/CardButton/GetCardButton/CreateCardButton";
import { IBoard, ICard } from "../../lib/types";
import { RouteEnum } from "../../lib/route/RouteEnum";
import RenameBoardButton from "../../components/Button/BoardButton/RenameBoardButton/RenameBoardButton";
import { getBoard } from "../../store/action/BoardAction";
import { isBoardsSelector } from "../../store/slices/BoardSlice";

const BoardPage: FC = () => {
  const boards = useAppSelector(isBoardsSelector);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userDataSelector);
  const [board, setBoards] = useState<IBoard[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();

  const gif =
    "https://framerusercontent.com/images/lUWZ2z9geAGbpdf0JvpDsbZM3ww.gif";

  useEffect(() => {
    dispatch(getBoard()).then((data) => {
      const existingBoard = data.filter((board) => {
        const numBoardId = Number(boardId);
        return board.id === numBoardId;
      });
      if (!existingBoard.length) {
        navigate(RouteEnum.BOARD);
      }
    });
  }, []); // eslint-disable-line

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
            {!boards || boards.length === 0 ? (
              <div className={styles.createBoard}>Нет досок</div>
            ) : (
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
            )}
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
              {/*<Drag />*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
