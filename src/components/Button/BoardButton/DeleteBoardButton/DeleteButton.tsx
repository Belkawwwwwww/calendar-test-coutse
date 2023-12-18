import React, { FC } from "react";
import Modal from "../../../UI/Modal";
import { useNavigate } from "react-router-dom";
import ax from "../../../../utils/axios";
import { IResponse } from "../../../../lib/types";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import { RouteEnum } from "../../../../lib/route/RouteEnum";

interface DeleteButtonProps {
  boardId: number;
  nameBoard: string;
  onDeleteBoard: (boardId: number) => void;
  onDeleteCards: (boardId: number) => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({
  boardId,
  nameBoard,
  onDeleteBoard,
  onDeleteCards,
}) => {
  const navigate = useNavigate();
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();

  const handleDeleteButton = async () => {
    try {
      const response = await ax.delete<IResponse>(
        `/deleteBoard?boardId=${boardId}`,
      );
      if (response.status) {
        onDeleteBoard(boardId);
        onDeleteCards(boardId);
        navigate(RouteEnum.BOARD);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div onClick={handleModalOpen}>Удалить доску</div>
      {isModalActive ? (
        <Modal
          title={`Вы уверены что хотите удалить : ${nameBoard}`}
          onClose={handleModalClose}
          footerButtons={[
            {
              name: "Удалить",
              disabled: false,
              onClick: handleDeleteButton,
            },
            { name: "Отменить", disabled: false, onClick: handleModalClose },
          ]}
          customPosition={{ top: "-216px", right: "10px" }}
        ></Modal>
      ) : null}
    </>
  );
};
export default DeleteButton;
