import React, { FC, useState } from "react";
import styles from "../../pages/Boardpage/styles.module.sass";
import Modal from "../UI/Modal";
import useModalOpenClose from "../../store/hooks/custom-hooks/useModalOpenClose";
import { IList } from "../../lib/types";
import RenameListButton from "./ListButton/RenameListButton/RenameListButton";
import DeleteListButton from "./ListButton/DeleteListButton/DeleteListButton";
import { getContentList } from "../../store/action/ListAction";
import UpdateContent from "./ListButton/UpdateContent/UpdateContent";

interface ListsProps {
  cardLists: IList[];
  cardId: number;
  boardId: number;
}

const ListsList: FC<ListsProps> = ({ cardLists, cardId, boardId }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<IList | null>(null);
  const { isModalActive, handleModalOpen, handleModalClose } =
    useModalOpenClose();
  const handleListClick = async (selectedList: IList) => {
    setSelectedList(selectedList);
    handleModalOpen();
    getContentList(cardId);
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
                  image="/img/browser_icon.svg"
                  title={list.title}
                  onClose={handleModalClose}
                  customPosition={{ top: "50%", left: "50%" }}
                  width="600px"
                  height="451px"
                  imageClassName={styles.customImage}
                >
                  <div className={styles.modalListContent}>
                    <div className={styles.modalListContentLeft}>
                      <img
                        className={styles.browserIcon}
                        src="/img/menu_icon.svg"
                        alt="menu"
                      />
                      <div>Описание</div>
                    </div>
                    <UpdateContent
                      listId={list.id}
                      nameList={list.title}
                      cardId={cardId}
                      boardId={boardId}
                    />
                  </div>
                  <div className={styles.listContent}>
                    {list.content ? (
                      <div>{list.content}</div>
                    ) : (
                      <div>Контент пуст</div>
                    )}
                  </div>

                  <div
                    className={`${styles.ListButton} ${styles.alwaysJustify}`}
                  >
                    <RenameListButton
                      nameList={list.title}
                      listContent={list.content}
                      cardId={cardId}
                      boardId={boardId}
                      listId={list.id}
                    />
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
