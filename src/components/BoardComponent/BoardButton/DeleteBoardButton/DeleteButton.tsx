import React, { FC } from "react";
import Modal from "../../../UI/Modal";
import { useNavigate } from "react-router-dom";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import { RouteEnum } from "../../../../lib/route/RouteEnum";
import { useAppDispatch } from "../../../../store/hooks/redux";
import { deleteBoard } from "../../../../store/action/BoardAction";

interface DeleteButtonProps {
  boardId: number;
  nameBoard: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({
  boardId,
  nameBoard,
}) => {
  const navigate = useNavigate();
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const dispatch = useAppDispatch();

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
              onClick: () => handleDeleteButton(),
            },
            { name: "Отменить", disabled: false, onClick: handleModalClose },
          ]}
          customPosition={{ top: "18%", left: "88%" }}
          width="325px"
        ></Modal>
      ) : null}
    </>
  );
};
export default DeleteButton;
