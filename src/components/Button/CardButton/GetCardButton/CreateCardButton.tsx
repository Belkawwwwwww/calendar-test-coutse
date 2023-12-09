import React, { FC, useEffect, useState } from "react";
import styles from "./styles.module.sass";
import { ICard, IResponse } from "../../../../lib/types";
import ax from "../../../../utils/axios";
import Modal from "../../../UI/Modal";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";

interface GetFileButtonProps {
  boardId: number;
  updateCards: (card: ICard) => void;
}

const CreateCardButton: FC<GetFileButtonProps> = ({ boardId, updateCards }) => {
  const [nameCard, setNameCard] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
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
        const response = await ax.post<IResponse<ICard>>(`/createСard`, {
          boardId,
          nameCard,
        });
        console.log(response.data);
        const newCard = response.data.data;
        if (newCard && response.status) {
          handleModalClose();
          setNameCard("");
          updateCards(newCard);
          console.log("boardId:", boardId, "nameCard:", nameCard);
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
            customPosition={{ top: "-220px", right: "980px" }}
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
