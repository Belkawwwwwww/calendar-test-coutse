import React, { FC } from "react";
import Modal from "../../UI/Modal";
import { useNavigate } from "react-router-dom";
import ax from "../../../utils/axios";
import { IResponse } from "../../../lib/types";
import useModalOpenClose from "../../../store/hooks/custom-hooks/useModalOpenClose";

interface RemoveButtonProps {
  boardId: number;
  nameBoard: string;
  onDeleteBoard: (boardId: number) => void;
}

const RemoveButton: FC<RemoveButtonProps> = ({
  boardId,
  nameBoard,
  onDeleteBoard,
}) => {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();

  const handleDeleteButton = async () => {
    try {
      const response = await ax.delete<IResponse>(
        `/deleteBoard?boardId=${boardId}&userId=${userId}`,
      );
      if (response.data.answercode === 1) {
        onDeleteBoard(boardId);
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
          customPosition={{ top: "-35px", right: "0px" }}
        >
          <div></div>
        </Modal>
      ) : null}
    </>
  );
};
export default RemoveButton;
