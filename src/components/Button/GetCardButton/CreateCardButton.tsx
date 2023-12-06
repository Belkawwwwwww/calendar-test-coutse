import React, { FC, useEffect, useState } from "react";
import styles from "./styles.module.sass";
import { IResponse } from "../../../lib/types";
import ax from "../../../utils/axios";
import Modal from "../../UI/Modal";
import useModalOpenClose from "../../../store/hooks/custom-hooks/useModalOpenClose";

interface GetFileButtonProps {
  boardId: number;
  //updateCards: (newCard: any) => void;
}

const CreateCardButton: FC<GetFileButtonProps> = ({ boardId,  }) => {
  const [nameCard, setNameCard] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const userId = Number(localStorage.getItem("userId"));
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();

  useEffect(() => {
    if (!isModalActive) {
      setNameCard("");
      setError(undefined);
    }
  }, [isModalActive]);
  const handleSubmitModal = async () => {
    if (nameCard) {
      try {
        const response = await ax.post<IResponse>("/createСard", {
          boardId,
          nameCard,
          userId,
        });
        console.log(response.data);
        const cardId = response.data.data.cardId;
        if (cardId && response.data.answercode === 1) {
          handleModalClose();
          setNameCard("");
          // updateCards({ cardId, boardId, nameCard });

          console.log(
            "boardId:",
            boardId,
            "nameCard:",
            nameCard,
            "cardId",
            cardId,
          );
        }
      } catch (e) {}
    }
  };

  const isCreateButtonDisabled = nameCard.length === 0;
  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameCard(e.target.value);
  };

  return (
    <div className={styles.app}>
      <div className={styles.btnGetFile} onClick={handleModalOpen}>
        Создать карточку
      </div>
      <div className={styles.modal}>
        {isModalActive ? (
          <Modal
            onClose={handleModalClose}
            footerButtons={[
              {
                name: "Сохранить",
                disabled: isCreateButtonDisabled,
                onClick: handleSubmitModal,
              },
              {
                name: "Отменить",
                disabled: false,
                onClick: handleModalClose,
              },
            ]}
            customPosition={{ top: "-62px", right: "947px" }}
          >
            <input
              placeholder="Название карточки"
              value={nameCard}
              className={styles.inputModal}
              type="text"
              onChange={onHandlerModal}
              required
            />
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default CreateCardButton;
