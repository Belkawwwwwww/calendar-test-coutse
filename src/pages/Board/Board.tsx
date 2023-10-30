import React, { FC } from "react";
import styles from "./Board.module.sass";
import {useAppSelector} from "../../store/hooks/redux";
import {userDataSelector} from "../../store/slices/UserSlice";


const Board: FC = () => {
  const user = useAppSelector(userDataSelector)

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.leftNavbar}>
          <div className={styles.lists}>
            <div className={styles.list}>
              <img src="/img/board.svg" alt="board" />
              <a href="" className={styles.listA}>
                Доски
              </a>
            </div>
            <div className={styles.list}>
              <img src="/img/board.svg" alt="board" />
              <a href="" className={styles.listA}>
                Шаблоны
              </a>
            </div>
          </div>
          <div>
            <div className={styles.content}>
              <div className={styles.list}>
                <div className={styles.title}>Рабочие пространства</div>
                <button className={styles.button}>
                  <img src="/img/plus.svg" alt="" />
                </button>
              </div>
              <div className={styles.lists}>
                <div className={styles.list}>
                  <div className={styles.listA}>
                    {user.username}: рабочее пространство
                  </div>
                  <button className={styles.button}>
                    <img className={styles.angle} src="/img/angle.svg" alt="" />
                  </button>
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
                    <a className={styles.page} href="">
                      Доски
                    </a>
                    <a className={styles.page} href="">
                      Представления
                    </a>
                    <a className={styles.page} href="">
                      Участники
                    </a>
                    <a className={styles.page} href="">
                      Настройки
                    </a>
                  </div>
                </div>
                <div>
                  <div className={styles.create}>
                    <a href="" className={styles.createBoard}>
                      Создать доску
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.closeBoard}>
            Посмотреть закрытые доски
          </button>
        </div>
      </div>
    </div>
  );
};

export default Board;
