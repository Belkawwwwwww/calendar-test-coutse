import React, { FC, useEffect, useState } from "react";
import styles from "../../../Navbar/styles.module.sass";
import Modal from "../../../UI/Modal";
import { useNavigate } from "react-router-dom";
import useModalOpenClose from "../../../../store/hooks/custom-hooks/useModalOpenClose";
import { RouteEnum } from "../../../../lib/route/RouteEnum";
import { useAppDispatch } from "../../../../store/hooks/redux";
import { createBoard } from "../../../../store/action/BoardAction";

const CreateBoardButton: FC = () => {
  const dispatch = useAppDispatch();
  const [nameBoard, setNameBoard] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  useEffect(() => {
    if (!isModalActive) {
      setNameBoard("");
      setError(undefined);
    }
  }, [isModalActive]);

  const handleSubmitModal = () => {
    if (nameBoard) {
      dispatch(createBoard(nameBoard))
        .then((response) => {
          if (response.data) {
            const createdBoardId = response.data.id;
            navigate(`${RouteEnum.BOARD}/${createdBoardId}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      handleModalClose();
      setNameBoard("");
    } else {
      navigate(RouteEnum.BOARD);
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
          customPosition={{ top: "-265px", right: "270px" }}
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
