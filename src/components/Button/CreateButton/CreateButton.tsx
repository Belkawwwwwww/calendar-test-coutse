import React, { useEffect, useState } from "react";
import styles from "../../Navbar/styles.module.sass";
import Modal from "../../UI/Modal";
import ax from "../../../utils/axios";
import { IResponse } from "../../../lib/types";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../../lib/route/RouteEnum";

const CreateButton = () => {
  const [nameBoard, setNameBoard] = useState<string>("");
  const [isModalActive, setModalActive] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const userId = Number(localStorage.getItem("userId"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isModalActive) {
      setNameBoard("");
      setModalActive(false);
      setError(undefined);
    }
  }, [isModalActive]);
  const handleModalOpen = () => {
    setModalActive(true);
  };
  const handleModalClose = () => {
    setModalActive(false);
  };

  const handleSubmitModal = async () => {
    if (nameBoard) {
      try {
        const response = await ax.post<IResponse>("/createBoard", {
          nameBoard,
          userId,
        });
        console.log(response.data);
        const boardId = response.data.data.boardId;

        if (boardId) {
          navigate(`/board/${boardId}`);
          handleModalClose();
          setNameBoard("");
          console.log(boardId, nameBoard);
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
          customPosition={{ top: "-100px", right: "270px" }}
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


export default CreateButton;
