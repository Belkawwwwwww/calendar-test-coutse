import React, { FC } from "react";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import styles from "../../../../pages/Boardpage/styles.module.sass";
import Modal from "../../../UI/Modal";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks/redux";
import { deleteCard, getCard } from "../../../../store/action/CardAction";
import {isCardSelector} from "../../../../store/slices/CardSlice";

interface DeleteCardButtonProps {
  boardId: number;
  cardId: number;
  nameCard: string;
}

const BurgerCard: FC<DeleteCardButtonProps> = ({
  cardId,
  nameCard,
  boardId,
}) => {
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const dispatch = useAppDispatch();
  const cards = useAppSelector(isCardSelector);

  const handleDeleteCardButton = () => {
    if (cards !== null) {
      dispatch(deleteCard(boardId, cardId))
          .then(() => {
            handleModalClose();
            // const updatedCards = cards.filter((card) => card.id !== cardId);
            dispatch(getCard(boardId));
          })
          .catch((error) => {
            console.error("Произошла ошибка при удалении карточки:", error);
          });
    }
  };

  return (
    <>
      <div>
        <img
          onClick={handleModalOpen}
          className={styles.dotsCard}
          src="/img/dots.svg"
          alt="..."
        />
        {isModalActive ? (
          <Modal
            title={`Действия со списком :  ${nameCard}`}
            onClose={handleModalClose}
            customPosition={{ top: "-100px", right: "500px" }}
          >
            <div className={styles.lists}>Изменить название списка</div>
            <div className={styles.lists} onClick={handleDeleteCardButton}>
              Удалить список
            </div>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

export default BurgerCard;