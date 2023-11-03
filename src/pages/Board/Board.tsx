import React, { FC, useEffect } from "react";
import styles from "./Board.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { userDataSelector } from "../../store/slices/UserSlice";
import { getBoard } from "../../store/action/boardAction";
import { isNameBoardSelector } from "../../store/slices/BoardSlice";
import Dropdown from "../../components/Dropdown";

const Board: FC = () => {
  const user = useAppSelector(userDataSelector);
  const nameBoard = useAppSelector(isNameBoardSelector);
  const id = Number(localStorage.getItem("userId"));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoard(id));
  }, [dispatch, id]);

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.leftNavbar}>
          <div className={styles.lists}>
            <div className={styles.list}>
              <img src="/img/board.svg" alt="board" />
              <div className={styles.listA}>Доски</div>
            </div>
            <div className={styles.list}>
              <img src="/img/board.svg" alt="board" />
              <div className={styles.listA}>Шаблоны</div>
            </div>
          </div>
          <div>
            <div className={styles.content}>
              <div className={styles.lists}>
                <div className={styles.list}>
                  <div className={styles.listA}>
                    {user.username} : Ваши созданные доски
                    <Dropdown options={nameBoard} />
                  </div>
                  {/*<button className={styles.button}>*/}
                  {/*  <img className={styles.angle} src="/img/angle.svg" alt="" />*/}
                  {/*</button>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.allBoard}>
          <div className={styles.content}>
            <div>
              <h3>ВАШИ РАБОЧИЕ ПРОСТРАНСТВА</h3>
              <div className={styles.section}>
                <div className={styles.header}>
                  <h3>{user.username}</h3>
                  <div className={styles.options}>
                    <div className={styles.page}>Доски</div>
                    <div className={styles.page}>Представления</div>
                    <div className={styles.page}>Участники</div>
                    <div className={styles.page}>Настройки</div>
                  </div>
                </div>
                <div>
                  <div className={styles.create}>
                    <div className={styles.createBoard}>
                      возможно магическим образом тут будут созданные доски
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.closeBoard}>Посмотреть закрытые доски</div>
        </div>
      </div>
    </div>
  );
};

export default Board;
