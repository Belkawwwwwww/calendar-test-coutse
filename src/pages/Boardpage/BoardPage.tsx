import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { IBoard, ICard } from "../../lib/types";
import { RouteEnum } from "../../lib/route/RouteEnum";
import { getBoard } from "../../store/action/BoardAction";
import { getCard } from "../../store/action/CardAction";
import BoardList from "../../components/BoardComponent/BoardList";
import RenameBoard from "../../components/BoardComponent/RenameBoard";
import DeleteBoard from "../../components/BoardComponent/DeleteBoard";
import CreateCard from "../../components/CardComponent/CreateCard";
import CardList from "../../components/CardComponent/CardList";

const BoardPage: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userDataSelector);
  const [board, setBoards] = useState<IBoard[]>([]);
  const [card, setCards] = useState<ICard[]>([]);
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();

  const gif =
    "https://framerusercontent.com/images/lUWZ2z9geAGbpdf0JvpDsbZM3ww.gif";

  useEffect(() => {
    if (boardId) {
      const numBoardId = Number(boardId);
      dispatch(getBoard())
        .then((data) => {
          const existingBoard = data.filter((board) => board.id === numBoardId);
          if (!existingBoard.length) {
            navigate(RouteEnum.BOARD);
          }
        })
        .then(() => {
          dispatch(getCard());
        });
    }
  }, []); // eslint-disable-line

  return (
    <div className={styles.main_content}>
      <div className={styles.left_nav}>
        <div className={styles.username}>
          <img className={styles.gif} src={gif} alt="gg" />
        </div>
        <BoardList />
      </div>
      <div className={styles.content_wrapper}>
        <div className={styles.header}>
          <div>{user ? user.username : null}</div>
          <div className={styles.menu}></div>
          <div className={styles.board}>
            <RenameBoard boardId={Number(boardId)} setBoards={setBoards} />
            <DeleteBoard boardId={Number(boardId)} setBoards={setBoards} />
          </div>
        </div>
        <div className={styles.board_content}>
          <div className={styles.board_canvas}>
            <CreateCard boardId={Number(boardId)} setCards={setCards} />
            <div className={styles.cardsContainer}>
              <CardList boardId={Number(boardId)} setCards={setCards} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
