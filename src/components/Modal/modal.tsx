import { PropsWithChildren } from "react";
import styles from "./modal.module.sass";

interface IModalProps {
  active: boolean;
  title?: string;
  onSubmit: () => void;
  onClose: () => void;
}

const Modal = ({
  active,
  title,
  onClose,
  onSubmit,
  children,
}: PropsWithChildren<IModalProps>) => {
  if (!active) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <button onClick={onSubmit}>Сохранить</button>
          <button onClick={onClose}>Отменить</button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
