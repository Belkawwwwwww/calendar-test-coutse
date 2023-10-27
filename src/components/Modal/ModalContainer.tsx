import React, { FC, useState } from "react";
import ModalComponent from "./ModalComponent";

interface ModalContainerProps {
  isModalOpen: boolean;
  closeModal: () => void;
  createBoard: (boardName: string) => void;
}

const ModalContainer: FC<ModalContainerProps> = ({
  isModalOpen,
  closeModal,
  createBoard,
}) => {
  const [boardName, setBoardName] = useState("");

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };
  const handleSaveBoard = () => {
    createBoard(boardName);
    setBoardName("");
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).className === "modal-wrapper") {
      closeModal();
    }
  };
  return (
    <div className="modal-wrapper" onClick={handleOutsideClick}>
      <ModalComponent
        isModalOpen={isModalOpen}
        boardName={boardName}
        handleBoardNameChange={handleBoardNameChange}
        handleSaveBoard={handleSaveBoard}
      />
    </div>
  );
};

export default ModalContainer;
