import React, { useEffect, useState } from "react";
import styles from "./styles.module.sass";
import Modal from "../UI/Modal";
import { createBoard } from "../../store/action/boardAction";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { isModalOpenSelector, modalSlice } from "../../store/slices/ModalSlice";
import { boardSlice, errorBoardSelector } from "../../store/slices/BoardSlice";

const CreateButton = () => {
  const [nameBoard, setNameBoard] = useState<string>("");
  const [isModalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorBoardSelector);
  const isModalOpen = useAppSelector(isModalOpenSelector);

  useEffect(() => {
    if (!isModalOpen) {
      setNameBoard("");
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

  const handleSubmitModal = () => {
    if (nameBoard) {
      dispatch(createBoard(nameBoard));
      // navigate(`/board/${nameBoard}`);
    }
    console.log(nameBoard);
  };

  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameBoard(e.target.value);
  };
  const isCreateButtonDisabled = nameBoard.length === 0;

  return (
    <>
      <button className={styles.btnCreate} onClick={handleModalOpen}>
        Создать
      </button>
      {isModalActive ? (
        <Modal
          title="Название доски"
          onClose={handleModalClose}
          footerButtons={[
            {
              name: "Создать",
              disabled: isCreateButtonDisabled,
              onClick: handleSubmitModal,
            },
          ]}
        >
          <input
            value={nameBoard}
            className={styles.inputModal}
            type="text"
            onChange={onHandlerModal}
            required
          />
          {error ? (
            <div style={{ color: "red", margin: "10px", width: "40px" }}>
              {error}
            </div>
          ) : null}
        </Modal>
      ) : null}
    </>
  );
};

export default CreateButton;
