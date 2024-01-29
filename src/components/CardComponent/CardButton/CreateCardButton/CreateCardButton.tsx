import React, { FC, useEffect, useState } from "react";
import styles from "./styles.module.sass";
import Modal from "../../../UI/Modal";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import { useAppDispatch } from "../../../../store/hooks/redux";
import { createCard } from "../../../../store/action/CardAction";

interface GetFileButtonProps {
  boardId: number;
}

const CreateCardButton: FC<GetFileButtonProps> = ({ boardId }) => {
  const dispatch = useAppDispatch();
  const [nameCard, setNameCard] = useState<string>("");
  // const [error, setError] = useState<string | undefined>(undefined);
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();

  useEffect(() => {
    if (!isModalActive) {
      setNameCard("");
      // setError(undefined);
    }
  }, [isModalActive]);
  const handleSubmitModal = async () => {
    if (nameCard) {
      dispatch(createCard(nameCard, boardId));
      handleModalClose();
      setNameCard("");
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
            title="Название карточки"
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
            customPosition={{ top: "25%", left: "40%" }}
          >
            <input
              id="nameCard"
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
