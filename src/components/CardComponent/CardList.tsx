import React, { FC, useState } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import BurgerCard from "../Button/CardButton/BurgerCard/BurgerCard";
import { useAppSelector } from "../../store/hooks/redux";
import { isCardSelector } from "../../store/slices/CardSlice";
import CreateListButton from "../Button/ListButton/CreateListButton/CreateListButton";
import { isListSelector } from "../../store/slices/ListSlice";
import Modal from "../UI/Modal";
import useModalOpenClose from "../../store/hooks/custom-hooks/useModalOpenClose";

interface CardListProps {
  boardId: number;
}

const CardList: FC<CardListProps> = ({ boardId }) => {
  const cards = useAppSelector(isCardSelector);
  const lists = useAppSelector(isListSelector);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // const modals: boolean[] = Array.from({ length: lists.length }, () => false);

  const { isModalActive, handleModalOpen, handleModalClose } =
      useModalOpenClose();

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  // const handleModalOpenByIndex = (index: number) => {
  //   modals[index] = true;
  // };

  // const handleModalCloseByIndex = (index: number) => {
  //   modals[index] = false;
  // };


  return (
    <div className={styles.cards}>
      {cards &&
        cards.map((card) => {
          if (card.id && card.board_id === Number(boardId)) {
            const cardLists = lists.filter((list) => list.card_id === card.id);
            return (
              <div
                className={`${styles.btnGetFile} ${
                  cardLists.length > 0 ? styles.expand : ""
                }`}
                key={card.id}
              >
                <div>
                  <div className={styles.contentCard}>
                    <div className={styles.contentHeaderCard}>
                      {card.card_name}
                    </div>
                    <div>
                      <BurgerCard
                        boardId={card.board_id}
                        cardId={card.id}
                        nameCard={card.card_name}
                      />
                    </div>
                  </div>

                  <div className={styles.listsEnumeration}>
                    {cardLists.map((list, index) => (
                      <div key={list.id} className={styles.contentList}>
                        <div className={styles.contentHeaderCard}>
                          <div onClick={handleModalOpen}>{list.title}</div>
                          <div className={styles.modal}>
                            {isModalActive ? (
                                <Modal
                                    // title={`${list.title}`}
                                    onClose={handleModalClose}
                                    footerButtons={[
                                      {
                                        name: "Сохранить",
                                        // disabled: isCreateButtonDisabled,
                                        // onClick: handleSubmitModal,
                                      },
                                      {
                                        name: "Отменить",
                                        disabled: false,
                                        onClick: handleModalClose,
                                      },
                                    ]}
                                    customPosition={{ top: "50%", left: "50%" }}
                                >
                                  <input

                                      // value={nameCard}
                                      className={styles.inputModal}
                                      type="text"
                                      // onChange={onHandlerModal}
                                      required
                                  />
                                </Modal>
                            ) : null}
                          </div>
                          {list.content && (
                            <div
                              className={styles.contentIcon}
                              onMouseEnter={() => handleMouseEnter(index)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <img src="/img/menu_icon.svg" alt="user" />
                              {hoveredIndex === index && (
                                <div className={styles.overlay}>
                                  <div className={styles.overlayText}>
                                    Этот список с описанием
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <CreateListButton boardId={boardId} cardId={card.id} />
                </div>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
};

export default CardList;