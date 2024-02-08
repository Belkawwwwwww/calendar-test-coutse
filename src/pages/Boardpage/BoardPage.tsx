import React, { FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import BoardList from "../../components/BoardComponent/BoardList/BoardList";
import RenameBoardButton from "../../components/BoardComponent/BoardButton/RenameBoardButton/RenameBoardButton";
import DeleteBoardButton from "../../components/BoardComponent/BoardButton/DeleteBoardButton/DeleteBoardButton";
import CreateCard from "../../components/CardComponent/CardButton/CreateCardButton/CreateCard";
import CardList from "../../components/CardComponent/CardList/CardList";
import { getCard } from "../../store/action/CardAction";
import { getList } from "../../store/action/ListAction";
import { RouteEnum } from "../../lib/route/RouteEnum";
import { isBoardsSelector } from "../../store/slices/BoardSlice";

const BoardPage: FC = () => {
  const navigate = useNavigate();
  const boards = useAppSelector(isBoardsSelector);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userDataSelector);
  const { boardId } = useParams<{ boardId: string }>();
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boards.length > 0) {
      const boardExists = boards.some((board) => board.id === Number(boardId));
      if (!boardExists) {
        navigate(RouteEnum.BOARD);
      }
    }
    dispatch(getCard(Number(boardId)));
    dispatch(getList(Number(boardId)));
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollTo(0, 0); // Прокрутка к началу списка карточек
    }
  }, [boards, boardId]); // eslint-disable-line

  const gif =
    "https://framerusercontent.com/images/lUWZ2z9geAGbpdf0JvpDsbZM3ww.gif";

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
            <RenameBoardButton boardId={Number(boardId)} />
            <DeleteBoardButton boardId={Number(boardId)} />
          </div>
        </div>
        <div className={styles.board_content}>
          <div className={styles.board_canvas}>
            <CreateCard boardId={Number(boardId)} />
            <div className={styles.cardsContainer} ref={cardsContainerRef}>
              <CardList boardId={Number(boardId)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
