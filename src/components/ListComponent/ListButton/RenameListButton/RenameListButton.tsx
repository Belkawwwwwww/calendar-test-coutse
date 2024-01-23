import React, { FC, useState } from "react";
import styles from "../../../../pages/Boardpage/styles.module.sass";
import Modal from "../../../UI/Modal";
import { renameList } from "../../../../store/action/ListAction";
import { useAppDispatch } from "../../../../store/hooks/redux";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";

const RenameListButton: FC = () => {
  const dispatch = useAppDispatch();
  const [showRenameModal, setShowRenameModal] = useState(false);
  const { handleModalClose } = useModalOpenClose();

  const handleRenameCard = async (listId: number) => {
    dispatch(renameList(listId))
      .then(() => {
        handleModalClose();
        setShowRenameModal(false);
        // setNewCardName("");
      })
      .catch((error) => {
        console.error("Произошла ошибка при изменении названия списка:", error);
      });
  };
  const handleModalOpenModal = () => {
    setShowRenameModal(true);
  };
  const handleModalCloseModal = () => {
    setShowRenameModal(false);
  };
  return (
    <>
      <div className={styles.lists} onClick={handleModalOpenModal}>
        Изменить название списка
      </div>
      {showRenameModal ? (
        <Modal
          title="Изменить название списка"
          onClose={handleModalCloseModal}
          width="240px"
          // height="135px"
          footerButtons={[
            {
              name: "Сохранить",
              // disabled: isCreateButtonDisabled,
              onClick: () => handleRenameCard,
            },
            {
              name: "Отменить",
              disabled: false,
              onClick: handleModalCloseModal,
            },
          ]}
          customPosition={{ top: "70%", left: "41%" }}
        >
          <input
            // value={cardNewName}
            className={styles.inputModalCard}
            type="text"
            // onChange={onHandlerModal}
            required
          />
        </Modal>
      ) : null}
    </>
  );
};

export default RenameListButton;
