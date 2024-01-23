import React, { FC, useState } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import Modal from "../UI/Modal";
import useModalOpenClose from "../../store/hooks/custom-hooks/useModalOpenClose";
import { IList } from "../../lib/types";
import { useAppDispatch } from "../../store/hooks/redux";
import { deleteList } from "../../store/action/ListAction";
import RenameListButton from "./ListButton/RenameListButton/RenameListButton";

interface ListsProps {
  cardLists: IList[];
}

const ListsList: FC<ListsProps> = ({ cardLists }) => {
  const dispatch = useAppDispatch();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<IList | null>(null);
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const handleListClick = async (selectedList: IList) => {
    setSelectedList(selectedList);
    handleModalOpen();
  };

  const handleDeleteListButton = () => {
    if (selectedList !== null) {
      dispatch(deleteList(selectedList.id))
        .then(() => {
          handleModalClose();
        })
        .catch((error) => {
          console.log("Произошла ошибка при удалении списка:", error);
        });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className={styles.listsEnumeration}>
      {cardLists.map((list, index) => (
        <div key={list.id} className={styles.contentList}>
          <div className={styles.contentHeaderCard}>
            <div onClick={() => handleListClick(list)}>{list.title}</div>
            <div className={styles.modal}>
              {isModalActive && selectedList && selectedList.id === list.id ? (
                <Modal
                  title={selectedList.title}
                  onClose={handleModalClose}
                  customPosition={{ top: "50%", left: "50%" }}
                  width="500px"
                  height="130px"
                >
                  {selectedList.content ? (
                    <div>{selectedList.content}</div>
                  ) : (
                    <div>Контент пуст</div>
                  )}

                  <div className={styles.ListButton}>
                    <RenameListButton />
                    <div
                      className={styles.lists}
                      onClick={handleDeleteListButton}
                    >
                      Удалить список
                    </div>
                  </div>
                </Modal>
              ) : null}
            </div>
            {list.content && (
              <div
                className={styles.contentIcon}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img src="/img/menu_icon.svg" alt="user" />
                {hoveredIndex === index ? (
                  <div className={styles.overlay}>
                    <div className={styles.overlayText}>
                      Этот список с описанием
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListsList;
