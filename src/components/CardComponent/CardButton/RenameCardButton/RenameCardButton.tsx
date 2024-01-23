import React, { FC, useState } from "react";
import styles from "../../../../pages/Boardpage/styles.module.sass";
import Modal from "../../../UI/Modal";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import { renameCard } from "../../../../store/action/CardAction";
import { useAppDispatch } from "../../../../store/hooks/redux";

interface RenameCardProps {
  cardId: number;
  boardId: number;
}

const RenameCardButton: FC<RenameCardProps> = ({ cardId, boardId }) => {
  const dispatch = useAppDispatch();
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [cardNewName, setNewCardName] = useState("");
  const isCreateButtonDisabled = cardNewName.length === 0;
  const { handleModalClose } = useModalOpenClose();

  const handleRenameCard = async () => {
    dispatch(renameCard(cardId, cardNewName, boardId))
      .then(() => {
        handleModalClose();
        setShowRenameModal(false);
        setNewCardName("");
      })
      .catch((error) => {
        console.error(
          "Произошла ошибка при изменении названия карточки:",
          error,
        );
      });
  };
  const handleModalOpenModal = () => {
    setShowRenameModal(true);
  };
  const handleModalCloseModal = () => {
    setShowRenameModal(false);
  };
  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardName(e.target.value);
  };
  return (
    <>
      <div className={styles.lists} onClick={handleModalOpenModal}>
        Изменить название карточки
      </div>

      {showRenameModal ? (
        <Modal
          title="Изменить название карточки"
          onClose={handleModalCloseModal}
          width="350px"
          height="140px"
          footerButtons={[
            {
              name: "Изменить",
              disabled: isCreateButtonDisabled,
              onClick: handleRenameCard,
            },
            {
              name: "Отменить",
              disabled: false,
              onClick: handleModalCloseModal,
            },
          ]}
          customPosition={{ top: "35%", left: "50%" }}
        >
          <input
            value={cardNewName}
            className={styles.inputModalCard}
            type="text"
            onChange={onHandlerModal}
            required
          />
        </Modal>
      ) : null}
    </>
  );
};

export default RenameCardButton;
