import React, { FC, useState } from "react";
import Modal from "../../UI/Modal";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../../lib/route/RouteEnum";
import ax from "../../../utils/axios";
import { IResponse } from "../../../lib/types";

interface RemoveButtonProps {
  boardId: number;
  nameBoard: string;
}

const RemoveButton: FC<RemoveButtonProps> = ({ boardId, nameBoard }) => {
  const [isModalActive, setModalActive] = useState(false);
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  const handleModalOpen = () => {
    setModalActive(true);
  };
  // const handleDeleteBoard = () => {
  //   navigate(RouteEnum.BOARD);
  // };

  const handleModalClose = () => {
    setModalActive(false);
  };

  // const handleDeleteButton = async () => {
  //   try {
  //     const response = await ax.delete<IResponse>(
  //       `/deleteBoard?boardId=${boardId}&userId=${userId}`,
  //     );
  //   } catch (e) {}
  // };

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
