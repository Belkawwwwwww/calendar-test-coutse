import React, { FC } from "react";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import ax from "../../../../utils/axios";
import { IResponse } from "../../../../lib/types";
import styles from "../../../../pages/Boardpage/styles.module.sass";
import Modal from "../../../UI/Modal";

interface DeleteCardButtonProps {
  boardId: number;
  cardId: number;
  nameCard: string;
  onDeleteCard: (cardId: number) => void;
}

const BurgerCard: FC<DeleteCardButtonProps> = ({
  cardId,
  nameCard,
  boardId,
  onDeleteCard,
}) => {
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();

  const handleDeleteCardButton = async () => {
    try {
      const response = await ax.delete<IResponse>(
        `/deleteCard?cardId=${cardId}&boarId=${boardId}`,
      );
      if (response.status) {
        onDeleteCard(cardId);
        handleModalClose();
      }
    } catch (e) {
      console.log(e);
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
            <div>Изменить название списка</div>
            <div onClick={handleDeleteCardButton}>Удалить список</div>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

export default BurgerCard;
