import React, { FC, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../components/Button/DeleteBoardButton/DeleteButton";
import CreateCardButton from "../../components/Button/GetCardButton/CreateCardButton";
import { IBoard, ICards, IResponse, IResponseData } from "../../lib/types";
import ax from "../../utils/axios";
import { RouteEnum } from "../../lib/route/RouteEnum";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";

const BoardPage: FC = () => {
  const user = useAppSelector(userDataSelector);
  const userId = Number(localStorage.getItem("userId"));
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [cards, setCards] = useState<IResponseData>({});

  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const gif =
    "https://framerusercontent.com/images/lUWZ2z9geAGbpdf0JvpDsbZM3ww.gif";

  useLayoutEffect(() => {
    const getBoard = async (): Promise<IBoard[]> => {
      const responseBoard = await ax.get<IResponse>(
        `/getBoard?userId=${userId}`,
      );
      console.log(responseBoard.data);

      return responseBoard.data.data;
    };

    getBoard().then((data) => {
      setBoards(data);
      const existingBoard = data.filter((board) => {
        const numbBoardId = Number(boardId);
        return board.boardId === numbBoardId;
      });
      if (!existingBoard.length) {
        navigate(RouteEnum.BOARD);
      }
    });

    const getCard = async () => {
      const responseCard = await ax.get<IResponse>(
        `/getCard?boardId=${boardId}&userId=${userId}`,
      );

      return responseCard.data.data;
    };
    getCard().then((data) => {
      setCards(data);
    });
  }, [boardId]); // eslint-disable-line

  const handleDeleteBoard = (boardId: number) => {
    setBoards((prevBoards) => {
      if (prevBoards.length === 1) {
        navigate(RouteEnum.BOARD);
      }
      return prevBoards.filter((board) => board.boardId !== boardId);
    });
  };

  // const updateCards = (newCard: any) => {
  //   setCards((prevCards) => {
  //     return { ...prevCards, ...newCard };
  //   });
  // };

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
                    to={`/board/${board.boardId}`}
                    className={styles.createBoard}
                    key={board.boardId}
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    {board.nameBoard}
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
              <div className={styles.delete_board}>Изменить название доски</div>
              <div className={styles.delete_board}>
                {boards?.map((board) => {
                  if (board.boardId === Number(boardId)) {
                    return (
                      <DeleteButton
                        key={board.boardId}
                        boardId={board.boardId}
                        nameBoard={board.nameBoard}
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
               if (board.boardId === Number(boardId)) {
                 return (
                     <CreateCardButton
                         key={board.boardId}
                         boardId={board.boardId}
                     />
                 );
               } else {
                 return null;
               }
             })}
           </div>
           <div className={styles.cards}>
             {Object.values(cards).map((boardData: ICards[]) =>
                 boardData.map((card: ICards) => (
                     <div key={card.cardId}>
                       <div>Card ID: {card.cardId}</div>
                       <div className={styles.btnGetFile}>Name: {card.nameCard}</div>
                     </div>
                 )),
             )}


             {/*<DragAndDrop />*/}
           </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
