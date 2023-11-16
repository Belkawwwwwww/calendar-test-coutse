import React, { FC, useState } from "react";
import Modal from "../UI/Modal";
import { modalSlice } from "../../store/slices/ModalSlice";
import { boardSlice, isBoardSelector } from "../../store/slices/BoardSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { deleteBoard } from "../../store/action/boardAction";

const RemoveButton: FC = () => {
  const [isModalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const userId = Number(localStorage.getItem("userId"));
  const boards = useAppSelector(isBoardSelector);
  const boardIds = boards ? boards.map((board) => board.id) : [];

  const handleModalOpen = () => {
    dispatch(modalSlice.actions.setIsModalOpen(true));
    setModalActive(true);
  };
  const handleDeleteBoard = (boardId: number, userId: number) => {
    dispatch(deleteBoard(userId, boardId));
    setModalActive(false);
    console.log(boardId);
  };

  const handleModalClose = () => {
    setModalActive(false);
    dispatch(modalSlice.actions.setIsModalOpen(false));
    dispatch(boardSlice.actions.setError(undefined));
  };

  return (
    <>
      <div onClick={handleModalOpen}>Удалить доску</div>
      {isModalActive ? (
        <Modal
          title="Вы уверены, что хотите удалить: название доски"
          onClose={handleModalClose}
          footerButtons={[
            {
              name: "Удалить",
              disabled: false,
              onClick: () => handleDeleteBoard(boardIds[0] ?? 0, userId ?? 0),
            },
            { name: "Отменить", disabled: false, onClick: handleModalClose },
          ]}
        >
          <div></div>
        </Modal>
      ) : null}
    </>
  );
};
export default RemoveButton;
