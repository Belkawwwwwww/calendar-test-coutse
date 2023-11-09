import React, { FC, useEffect } from "react";
import styles from "./Board.module.sass";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { getBoard } from "../../store/action/boardAction";
import { isNameBoardSelector } from "../../store/slices/BoardSlice";
import Dropdown from "../../components/UI/Dropdown/DropDown";

const Board: FC = () => {
  const nameBoard = useAppSelector(isNameBoardSelector);
  const id = Number(localStorage.getItem("userId"));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoard(id));
  }, [id]); // eslint-disable-line

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.leftNavbar}>
          <div className={styles.lists}>
            <div className={styles.list}>
              <img src="/img/board.svg" alt="board" />
              <div className={styles.listA}>Доски</div>
            </div>
          </div>
          <div>
            <div className={styles.content}>
              <div className={styles.lists}>
                <div className={styles.list}>
                  <div className={styles.listA}>
                    <Dropdown options={nameBoard} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.allBoard}>
          <div className={styles.content}>
            <h3>ВАШИ РАБОЧИЕ ПРОСТРАНСТВА</h3>
            <div className={styles.section}>
              <div className={styles.create}>
                <div className={styles.createBoard}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
