import React, { FC, useState } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import Modal from "../UI/Modal";
import useModalOpenClose from "../../store/hooks/custom-hooks/useModalOpenClose";
import { IList } from "../../lib/types";
import RenameListButton from "./ListButton/RenameListButton/RenameListButton";
import DeleteListButton from "./ListButton/DeleteListButton/DeleteListButton";

interface ListsProps {
  cardLists: IList[];
}

const ListsList: FC<ListsProps> = ({ cardLists }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<IList | null>(null);
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const handleListClick = async (selectedList: IList) => {
    setSelectedList(selectedList);
    handleModalOpen();
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
          <div
            className={styles.contentHeaderCard}
            onClick={() => handleListClick(list)}
          >
            <div>{list.title}</div>
            <div className={styles.modal}>
              {isModalActive && selectedList && selectedList.id === list.id ? (
                <Modal
                  image="/img/browser_icon.svg"
                  title={selectedList.title}
                  onClose={handleModalClose}
                  customPosition={{ top: "50%", left: "50%" }}
                  width="460px"
                  height="152px"
                  imageClassName={styles.customImage}
                >
                  <div className={styles.modalListContent}>
                    <img
                      className={styles.browserIcon}
                      src="/img/menu_icon.svg"
                      alt="menu"
                    />
                    <div>Описание</div>
                  </div>
                  <div className={styles.listContent}>
                    {selectedList.content ? (
                      <div>{selectedList.content}</div>
                    ) : (
                      <div>Контент пуст</div>
                    )}
                  </div>

                  <div className={styles.ListButton}>
                    <RenameListButton />
                    <DeleteListButton nameList={list.title} listId={list.id} />
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
