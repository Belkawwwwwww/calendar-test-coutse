import React, { FC, useEffect, useRef } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { useParams } from "react-router-dom";
import BoardList from "../../components/BoardComponent/BoardList";
import RenameBoardButton from "../../components/BoardComponent/BoardButton/RenameBoardButton/RenameBoardButton";
import DeleteBoardButton from "../../components/BoardComponent/BoardButton/DeleteBoardButton/DeleteBoardButton";
import CreateCard from "../../components/CardComponent/CardButton/CreateCardButton/CreateCard";
import CardList from "../../components/CardComponent/CardList";

const BoardPage: FC = () => {
  const user = useAppSelector(userDataSelector);
  // const boards = useAppSelector(isBoardsSelector);
  // const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsContainerRef.current) {
      cardsContainerRef.current.scrollTo(0, 0); // Прокрутка к началу списка карточек
    }
  }, [boardId]);
  // useEffect(() => {
  //   const parsedBoardId = Number(boardId);
  //   const boardExist = boards.filter((board) => board.id === parsedBoardId);
  //   console.log(`url:${parsedBoardId}` , `bek:${boardExist}`, boardExist);
  //   if (!boardExist.length) {
  //     navigate(RouteEnum.BOARD);
  //   }
  // }, [boardId]); //eslint-disable-line

  // useLayoutEffect(() => {
  //     const parsedBoardId = Number(boardId);
  //   const boardExist = boards.filter((board) => board.id === Number(boardId));
  //     console.log(`url:${parsedBoardId}` , `bek:${boardExist}`, boardExist);
  //
  //   if (!boardExist.length) {
  //     navigate(RouteEnum.BOARD)
  // }}, [boardId]); //eslint-disable-line

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
