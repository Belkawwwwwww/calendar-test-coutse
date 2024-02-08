import React, { FC } from "react";
import styles from "./styles.module.sass";
import { deleteCard } from "../../../../store/action/CardAction";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/redux";
import { isCardSelector } from "../../../../store/slices/CardSlice";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import { Modal } from "../../../UI/Modal";

interface DeleteCardProps {
  boardId: number;
  cardId: number;
  nameCard: string;
}

const DeleteCardButton: FC<DeleteCardProps> = ({
  boardId,
  cardId,
  nameCard,
}) => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(isCardSelector);
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const handleDeleteCardButton = () => {
    if (cards !== null) {
      dispatch(deleteCard(boardId, cardId))
        .then(() => {
          handleModalClose();
        })
        .catch((error) => {
          console.error("Произошла ошибка при удалении карточки:", error);
        });
    }
  };
  return (
    <>
      <div className={styles.lists} onClick={handleModalOpen}>
        Удалить карточку
      </div>
      {isModalActive ? (
        <Modal
          title={`Удалить карточку: ${nameCard}`}
          onClose={handleModalClose}
          footerButtons={[
            {
              name: "Удалить",
              onClick: handleDeleteCardButton,
            },
            {
              name: "Отменить",
              onClick: handleModalClose,
            },
          ]}
          customPosition={{ top: "48%", left: "49%" }}
          width="300px"
        ></Modal>
      ) : null}
    </>
  );
};

export default DeleteCardButton;
