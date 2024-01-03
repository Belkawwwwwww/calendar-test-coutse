import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import styles from "./styles.module.sass";
import { userDataSelector } from "../../store/slices/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import BoardList from "../../components/BoardComponent/BoardList";
import RenameBoard from "../../components/BoardComponent/RenameBoard";
import DeleteBoard from "../../components/BoardComponent/DeleteBoard";
import CreateCard from "../../components/CardComponent/CreateCard";
import CardList from "../../components/CardComponent/CardList";
import { isBoardsSelector } from "../../store/slices/BoardSlice";
import { isCardSelector } from "../../store/slices/CardSlice";

const BoardPage: FC = () => {
  const boards = useAppSelector(isBoardsSelector);
  const cards = useAppSelector(isCardSelector);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userDataSelector);
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();

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
            <RenameBoard boardId={Number(boardId)} />
            <DeleteBoard boardId={Number(boardId)} />
          </div>
        </div>
        <div className={styles.board_content}>
          <div className={styles.board_canvas}>
            <CreateCard boardId={Number(boardId)} />
            <div className={styles.cardsContainer}>
              {/*{cards?.map((card) => (*/}
              <CardList boardId={Number(boardId)} />
              {/*))}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
