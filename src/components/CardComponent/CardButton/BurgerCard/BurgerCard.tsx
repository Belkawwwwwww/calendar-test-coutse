import React, { FC } from "react";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import styles from "./styles.module.sass";
import Modal from "../../../UI/Modal";
import RenameCardButton from "../RenameCardButton/RenameCardButton";
import DeleteCardButton from "../DeleteCardButton/DeleteCardButton";

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

  return (
    <>
      <img
        onClick={handleModalOpen}
        className={styles.dotsCard}
        src="/img/dots.svg"
        alt="..."
      />
      {isModalActive ? (
        <Modal
          title={`Действия с карточкой :  ${nameCard}`}
          onClose={handleModalClose}
          customPosition={{ top: "35%", left: "50%" }}
          height="140px"
        >
          <RenameCardButton cardId={cardId} boardId={boardId} />
          <DeleteCardButton
            boardId={boardId}
            cardId={cardId}
            nameCard={nameCard}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default BurgerCard;
