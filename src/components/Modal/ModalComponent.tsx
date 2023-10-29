import React, { FC } from "react";

interface ModalComponentProps {
  isModalOpen: boolean;
  boardName: string;
  handleBoardNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveBoard: () => void;
}

const ModalComponent: FC<ModalComponentProps> = ({
  isModalOpen,
  boardName,
  handleBoardNameChange,
  handleSaveBoard,
}) => {
  if (!isModalOpen) {
    return null;
  }
  return (
    <div className="modal">
      <h1>Create board</h1>
      <input
        type="text"
        value={boardName}
        onChange={handleBoardNameChange}
        placeholder="Enter board name"
      />
      <button onClick={handleSaveBoard}>Save</button>
    </div>
  );
};

export default ModalComponent;
