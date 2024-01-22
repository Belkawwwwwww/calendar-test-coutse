import React, { FC, useState } from "react";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import Modal from "../../../UI/Modal";
import styles from "../../../Navbar/styles.module.sass";
import { useAppDispatch } from "../../../../store/hooks/redux";
import { renameBoard } from "../../../../store/action/BoardAction";

interface RenameButtonProps {
  boardId: number;
}

const RenameBoardButton: FC<RenameButtonProps> = ({ boardId }) => {
  const dispatch = useAppDispatch();
    const [boardNewName, setNewBoardName] = useState("");
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();

  const handleRenameBoard = async () => {
      dispatch(renameBoard(boardId, boardNewName))
        .then(() => {
          handleModalClose();
          setNewBoardName("");
        })
        .catch((error) => {
          console.error(
            "Произошла ошибка при изменении названия доски:",
            error,
          );
        });
  };
  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(e.target.value);
  };
  const isCreateButtonDisabled = boardNewName.length === 0;
  return (
    <>
      <div onClick={handleModalOpen}>Изменить название доски</div>
      {isModalActive ? (
        <Modal
          title="Изменить название доски"
          onClose={handleModalClose}
          footerButtons={[
            {
              name: "Изменить",
              disabled: isCreateButtonDisabled,
              onClick: handleRenameBoard,
            },
            { name: "Отменить", disabled: false, onClick: handleModalClose },
          ]}
          customPosition={{ top: "18%", left: "82%" }}
        >
          <input
            value={boardNewName}
            className={styles.inputModal}
            type="text"
            onChange={onHandlerModal}
            required
          />
        </Modal>
      ) : null}
    </>
  );
};

export default RenameBoardButton;