import React, { FC, useState } from "react";
import styles from "./styles.module.sass";
import Modal from "../../../UI/Modal";
import { renameTitleList } from "../../../../store/action/ListAction";
import { useAppDispatch } from "../../../../store/hooks/redux";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";

interface RenameListProps {
  cardId: number;
  nameList: string;
  listContent: string;
  boardId: number;
  listId: number;
}

const RenameListButton: FC<RenameListProps> = ({
  cardId,
  listContent,
  boardId,
  listId,
}) => {
  const dispatch = useAppDispatch();
  const [showRenameModal, setShowRenameModal] = useState(false);
  const { handleModalClose } = useModalOpenClose();
  const [listTitle, setListTitle] = useState("");
  const isCreateButtonDisabled = listTitle.length === 0;

  const handleRenameCard = async () => {
    await dispatch(
      renameTitleList(boardId, cardId, listId, listTitle, listContent),
    )
      .then(() => {
        handleModalClose();
        setShowRenameModal(false);
        setListTitle("");
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
  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListTitle(e.target.value);
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
          footerButtons={[
            {
              name: "Сохранить",
              disabled: isCreateButtonDisabled,
              onClick: () => handleRenameCard(),
            },
            {
              name: "Отменить",
              disabled: false,
              onClick: handleModalCloseModal,
            },
          ]}
          customPosition={{ top: "70.6%", left: "55%" }}
        >
          <input
            onChange={onHandlerModal}
            id="listTitle"
            value={listTitle}
            className={styles.inputModalCard}
            type="text"
            required
          />
        </Modal>
      ) : null}
    </>
  );
};

export default RenameListButton;
