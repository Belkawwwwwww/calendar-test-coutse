import React, { FC } from "react";
import styles from "../../../../pages/Boardpage/styles.module.sass";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import { deleteList } from "../../../../store/action/ListAction";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/redux";
import { isListSelector } from "../../../../store/slices/ListSlice";
import { IList } from "../../../../lib/types";
import { Modal } from "../../../UI/Modal";

const DeleteListButton: FC = () => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector(isListSelector);
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const handleDeleteListButton = (selectedList: IList) => {
    if (lists !== null) {
      dispatch(deleteList(selectedList.id))
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
          title={`Удалить список`}
          onClose={handleModalClose}
          footerButtons={[
            {
              name: "Удалить",
              onClick: () => handleDeleteListButton,
            },
            {
              name: "Отменить",
              onClick: handleModalClose,
            },
          ]}
          customPosition={{ top: "67%", right: "22%" }}
          width="250px"
          height="90px"
        ></Modal>
      ) : null}
    </>
  );
};

export default DeleteListButton;
