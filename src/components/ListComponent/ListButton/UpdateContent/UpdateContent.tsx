import React, { FC, useState } from "react";
import styles from "./styles.module.sass";
import { useAppDispatch } from "../../../../store/hooks/redux";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import Modal from "../../../UI/Modal";
import { updateContentList } from "../../../../store/action/ListAction";

interface updateContentProps {
  listId: number;
  nameList: string;
  cardId: number;
  boardId: number;
}

const UpdateContent: FC<updateContentProps> = ({
  listId,
  nameList,
  boardId,
  cardId,
}) => {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [listContent, setListContent] = useState("");
  const { handleModalClose } = useModalOpenClose();
  const dispatch = useAppDispatch();
  const isCreateButtonDisabled = listContent.length === 0;

  const handleUpdateContent = async () => {
    await dispatch(
      updateContentList(boardId, cardId, listId, nameList, listContent),
    )
      .then(() => {
        handleModalClose();
        setShowRenameModal(false);
        setListContent("");
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
  const onHandlerModal = (e: any) => {
    setListContent(e.target.value);
  };
  return (
    <>
      <div className={styles.btnUpdateContent} onClick={handleModalOpenModal}>
        Изменить
      </div>
      {showRenameModal ? (
        <Modal
          title="Изменить контент"
          onClose={handleModalCloseModal}
          width="240px"
          footerButtons={[
            {
              name: "Сохранить",
              disabled: isCreateButtonDisabled,
              onClick: () => handleUpdateContent(),
            },
            {
              name: "Отменить",
              disabled: false,
              onClick: handleModalCloseModal,
            },
          ]}
          customPosition={{ top: "35%", left: "78%" }}
        >
          <textarea
            value={listContent}
            onChange={onHandlerModal}
            required
          />
        </Modal>
      ) : null}
    </>
  );
};

export default UpdateContent;
