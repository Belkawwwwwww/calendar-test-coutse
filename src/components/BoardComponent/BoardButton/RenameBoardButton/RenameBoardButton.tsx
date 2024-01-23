import React, { FC, useState } from "react";
import styles from "../../../../pages/Boardpage/styles.module.sass";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/redux";
import { isBoardsSelector } from "../../../../store/slices/BoardSlice";
import Modal from "../../../UI/Modal";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import { renameBoard } from "../../../../store/action/BoardAction";

interface RenameBoardProps {
  boardId: number;
}

const RenameBoardButton: FC<RenameBoardProps> = ({ boardId }) => {
  const boards = useAppSelector(isBoardsSelector);
  const dispatch = useAppDispatch();
  const [boardNewName, setNewBoardName] = useState("");

  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const isCreateButtonDisabled = boardNewName.length === 0;
  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(e.target.value);
  };
  const handleRenameBoard = async () => {
    dispatch(renameBoard(boardId, boardNewName))
      .then(() => {
        handleModalClose();
        setNewBoardName("");
      })
      .catch((error) => {
        console.error("Произошла ошибка при изменении названия доски:", error);
      });
  };

  return (
    <div className={styles.delete_board}>
      {boards?.map((board) => {
        if (board.id === Number(boardId)) {
          return (
            <div key={board.id}>
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
                    {
                      name: "Отменить",
                      disabled: false,
                      onClick: handleModalClose,
                    },
                  ]}
                  customPosition={{ top: "18%", left: "82%" }}
                >
                  <input
                    id="nameBoard"
                    value={boardNewName}
                    className={styles.inputModal}
                    type="text"
                    onChange={onHandlerModal}
                    required
                  />
                </Modal>
              ) : null}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default RenameBoardButton;
