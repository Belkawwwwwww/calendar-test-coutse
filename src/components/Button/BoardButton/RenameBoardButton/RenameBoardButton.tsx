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
  const [newBoardName, setNewBoardName] = useState("");
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();

  const handleRenameBoard = async () => {
    dispatch(renameBoard(boardId, newBoardName));
  };
  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(e.target.value);
  };
  const isCreateButtonDisabled = newBoardName.length === 0;
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
          customPosition={{ top: "-200px", right: "150px" }}
        >
          <input
            value={newBoardName}
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