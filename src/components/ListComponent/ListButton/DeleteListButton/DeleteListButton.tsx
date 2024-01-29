import React, { FC } from "react";
import styles from "../../../../pages/Boardpage/styles.module.sass";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import { deleteList } from "../../../../store/action/ListAction";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/redux";
import { isListSelector } from "../../../../store/slices/ListSlice";
import { Modal } from "../../../UI/Modal";

interface DeleteListProps {
  nameList: string;
  listId: number;
}

const DeleteListButton: FC<DeleteListProps> = ({ nameList, listId }) => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector(isListSelector);
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const handleDeleteListButton = () => {
    if (lists !== null) {
      dispatch(deleteList(listId))
        .then(() => {
          handleModalClose();
        })
        .catch((error) => {
          console.log("Произошла ошибка при удалении списка:", error);
        });
    }
  };
  return (
    <>
      <div className={styles.lists} onClick={handleModalOpen}>
        Удалить список
      </div>
      {isModalActive ? (
        <Modal
          title={`Удалить список: ${nameList}`}
          onClose={handleModalClose}
          footerButtons={[
            {
              name: "Удалить",
              onClick: handleDeleteListButton,
            },
            {
              name: "Отменить",
              onClick: handleModalClose,
            },
          ]}
          customPosition={{ top: "65%", right: "22%" }}
          width="300px"
          height="97px"
        ></Modal>
      ) : null}
    </>
  );
};

export default DeleteListButton;
