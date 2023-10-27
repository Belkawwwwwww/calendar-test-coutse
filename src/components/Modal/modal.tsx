import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./modal.module.sass";
import Portal, { createContainer } from "../portal";

type IModalProps = {
  title?: string;
  onSubmit: () => void;
  onClose: () => void;
  children: React.ReactNode | React.ReactNode[];
};
const MODAL_CONTAINER_ID = "modal-container-id";
const Modal = (props: IModalProps) => {
  const { title, onClose, children, onSubmit } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("click", handleWrapperClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("click", handleWrapperClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  const handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> =
    useCallback(() => {
      onClose?.();
    }, [onClose]);

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className={styles.wrap} ref={rootRef}>
        <div className={styles.content}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
          >
            Х
          </button>
          <p className={styles.title}>{title}</p>
          {children}
          <div className={styles.footer}>
            <button onClick={onSubmit}>Создать</button>
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
};
export default Modal;
