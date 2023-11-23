import React, { FC, useEffect, useState } from "react";
import Modal from "../../UI/Modal";
import styles from "./styles.module.sass";
import {
  isModalOpenSelector,
  modalSlice,
} from "../../../store/slices/ModalSlice";
import { boardSlice } from "../../../store/slices/BoardSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import {createCard} from "../../../store/action/cardActions";

const GetFileButton: FC = () => {
  const [nameCard, setNameCard] = useState<string>("");
  const [isModalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(isModalOpenSelector);

  useEffect(() => {
    if (!isModalOpen) {
      setNameCard("");
      setModalActive(false);
    }
  }, [isModalOpen]);
  const handleModalOpen = () => {
    dispatch(modalSlice.actions.setIsModalOpen(true));
    setModalActive(true);
  };

  const handleModalClose = () => {
    setModalActive(false);
    dispatch(modalSlice.actions.setIsModalOpen(false));
    dispatch(boardSlice.actions.setError(undefined));
  };
  const isCreateButtonDisabled = nameCard.length === 0;
  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameCard(e.target.value);
  };

  const handleSubmitModal = () => {
    if (nameCard) {
      //dispatch(createCard())
    }
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
