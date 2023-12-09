import React, { FC, useState } from "react";
import ax from "../../../../utils/axios";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import Modal from "../../../UI/Modal";
import styles from "../../../Navbar/styles.module.sass";
import { IBoard } from "../../../../lib/types";

interface RenameButtonProps {
  boardId: number;
  setBoards: React.Dispatch<React.SetStateAction<IBoard[]>>;
}

const RenameBoardButton: FC<RenameButtonProps> = ({ boardId, setBoards }) => {
  const [newBoardName, setNewBoardName] = useState("");
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const handleRenameBoard = async () => {
    if (newBoardName.trim() !== "") {
      try {
        const response = await ax.put(`/renameBoard?boardId=${boardId}`, {
          boardId,
          newName: newBoardName,
        });
        if (response.status) {
          setBoards((prevBoards) =>
            prevBoards.map((board) =>
              board.id === boardId
                ? { ...board, name_board: newBoardName }
                : board,
            ),
          );
          handleModalClose();
          setNewBoardName("");
          console.log("Название доски изменено");
        } else {
          console.log("Ошибка при изменении");
        }
      } catch (e) {
        console.log(e);
      }
    }
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