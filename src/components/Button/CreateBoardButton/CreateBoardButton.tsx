import React, { FC, useEffect, useState } from "react";
import styles from "../../Navbar/styles.module.sass";
import Modal from "../../UI/Modal";
import ax from "../../../utils/axios";
import { IResponse } from "../../../lib/types";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../../lib/route/RouteEnum";
import useModalOpenClose from "../../../store/hooks/custom-hooks/useModalOpenClose";

const CreateBoardButton: FC = () => {
  const [nameBoard, setNameBoard] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const userId = Number(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  useEffect(() => {
    if (!isModalActive) {
      setNameBoard("");
      setError(undefined);
    }
  }, [isModalActive]);
  const handleSubmitModal = async () => {
    if (nameBoard) {
      try {
        const response = await ax.post<IResponse>("/createBoard", {
          nameBoard,
          userId,
        });

        console.log(response.data);
        const boardId = response.data.data.boardId;

        if (boardId && response.data.answercode === 1) {
          navigate(`/board/${boardId}`);
          handleModalClose();
          setNameBoard("");
          console.log(boardId, nameBoard);
        } else if (response.data.answercode === 7) {
        } else {
          navigate(RouteEnum.BOARD);
        }
      } catch (error) {
        setError("Произошла ошибка при создании доски");

        console.log(error);
      }
    }
  };

  const onHandlerModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameBoard(e.target.value);
  };
  const isCreateButtonDisabled = nameBoard.length === 0;

  return (
    <>
      <button className={styles.btnCreate} onClick={handleModalOpen}>
        Создать
      </button>
      {isModalActive ? (
        <Modal
          title="Название доски"
          onClose={handleModalClose}
          footerButtons={[
            {
              name: "Создать",
              disabled: isCreateButtonDisabled,
              onClick: handleSubmitModal,
            },
          ]}
          customPosition={{ top: "-140px", right: "270px" }}
        >
          <input
            value={nameBoard}
            className={styles.inputModal}
            type="text"
            onChange={onHandlerModal}
            required
          />
          {error && (
            <div style={{ color: "red", margin: "10px", width: "40px" }}>
              {error}
            </div>
          )}
        </Modal>
      ) : null}
    </>
  );
};


export default CreateBoardButton;
