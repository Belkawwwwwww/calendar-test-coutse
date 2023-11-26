import React, { FC, useEffect, useState } from "react";
import styles from "./styles.module.sass";
import { IResponse } from "../../../lib/types";
import ax from "../../../utils/axios";
import Modal from "../../UI/Modal";
import useModalOpenClose from "../../../store/hooks/custom-hooks/useModalOpenClose";

interface GetFileButtonProps {
  boardId: number;
  nameBoard: string;
}

const GetFileButton: FC<GetFileButtonProps> = ({ boardId, nameBoard }) => {
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
        const response = await ax.post<IResponse>("/createCard", {
          boardId,
          nameCard,
          userId,
        });
        console.log(response.data);
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
            customPosition={{ top: "20px", right: "1000px" }}
          >
            <input
              placeholder="Ввести заголовок списка"
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

export default GetFileButton;
