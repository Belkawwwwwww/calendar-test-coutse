import React, { FC, useState } from "react";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import styles from "../../../../pages/Boardpage/styles.module.sass";
import Modal from "../../../UI/Modal";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/redux";
import { deleteCard, renameCard } from "../../../../store/action/CardAction";
import { isCardSelector } from "../../../../store/slices/CardSlice";

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
  const [cardNewName, setNewCardName] = useState("");

  const [showRenameModal, setShowRenameModal] = useState(false);
  const handleModalOpenModal = () => {
    setShowRenameModal(true);
  };
  const handleModalCloseModal = () => {
    setShowRenameModal(false);
  };

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
  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardName(e.target.value);
  };

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
  const isCreateButtonDisabled = cardNewName.length === 0;

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
            title={`Действия с карточкой :  ${nameCard}`}
            onClose={handleModalClose}
            customPosition={{ top: "35%", left: "50%" }}
            height="140px"
          >
            <div className={styles.lists} onClick={handleModalOpenModal}>
              Изменить название карточки
            </div>

            {showRenameModal && (
              <Modal
                title="Изменить название карточки"
                onClose={handleModalCloseModal}
                width="296px"
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
                  className={styles.inputModal}
                  type="text"
                  onChange={onHandlerModal}
                  required
                />
              </Modal>
            )}
            <div className={styles.lists} onClick={handleDeleteCardButton}>
              Удалить карточку
            </div>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

export default BurgerCard;