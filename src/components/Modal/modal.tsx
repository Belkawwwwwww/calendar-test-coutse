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
  onClick: () => void;
  onClose: () => void;
  // onChange: (e: any) => void,
  children: React.ReactNode | React.ReactNode[];
  disabled: boolean;
};
const MODAL_CONTAINER_ID = "modal-container-id";
const Modal = (props: IModalProps) => {
  const { title, onClose, children, onClick, disabled } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleWrapperClick = (e: MouseEvent) => {
      const { target } = e;

      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };
    const handleEscapePress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
          {/*<input value={inputValue}  />*/}
          {children}
          <div className={styles.footer}>
            <button disabled={disabled} onClick={onClick}>
              Создать
            </button>
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
};
export default Modal;
