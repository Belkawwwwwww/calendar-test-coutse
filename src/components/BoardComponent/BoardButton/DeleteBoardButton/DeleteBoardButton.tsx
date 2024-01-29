import React, { FC } from "react";
import styles from "../../../../pages/Boardpage/styles.module.sass";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/redux";
import { isBoardsSelector } from "../../../../store/slices/BoardSlice";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import Modal from "../../../UI/Modal";
import { deleteBoard } from "../../../../store/action/BoardAction";
import { RouteEnum } from "../../../../lib/route/RouteEnum";
import { useNavigate } from "react-router-dom";

interface DeleteBoardProps {
  boardId: number;
}

const DeleteBoardButton: FC<DeleteBoardProps> = ({ boardId }) => {
  const boards = useAppSelector(isBoardsSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const handleDeleteButton = () => {
    dispatch(deleteBoard(boardId))
      .then(() => {
        navigate(RouteEnum.BOARD);
      })
      .catch((error) => {
        console.error("Произошла ошибка при удалении доски:", error);
      });
  };

  return (
    <div className={styles.delete_board}>
      {boards?.map((board) => {
        if (board.id === Number(boardId)) {
          return (
            <div key={board.id}>
              <div className={styles.btnDeleteBoard} onClick={handleModalOpen}>Удалить доску</div>
              {isModalActive ? (
                <Modal
                  title={`Вы уверены что хотите удалить : ${board.name_board}`}
                  onClose={handleModalClose}
                  footerButtons={[
                    {
                      name: "Удалить",
                      disabled: false,
                      onClick: () => handleDeleteButton(),
                    },
                    {
                      name: "Отменить",
                      disabled: false,
                      onClick: handleModalClose,
                    },
                  ]}
                  customPosition={{ top: "18%", left: "88%" }}
                  width="325px"
                ></Modal>
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

export default DeleteBoardButton;
