import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.sass";
import Portal, { createContainer } from "../../portal";

type IModalProps = {
  title?: string;
  onClose: () => void;
  children?: React.ReactNode | React.ReactNode[];
  footerButtons?: { name: string; onClick?: () => void; disabled?: boolean }[];
  position?: "top" | "bottom" | "left" | "right" | "width";
  customPosition?: {
    [key: string]: string | number;
  };
  width?: string;
  height?: string;
};
const MODAL_CONTAINER_ID = "modal-container-id";
export const Modal = (props: IModalProps) => {
    const {
      title,
      onClose,
      children,
      footerButtons,
      position,
      customPosition,
      width,
      height,
    } = props;
    const rootRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const modalStyle = {
    top: customPosition?.top || (position === "top" ? 0 : undefined),
    bottom: customPosition?.bottom || (position === "bottom" ? 0 : undefined),
    left: customPosition?.left || (position === "left" ? 0 : undefined),
    right: customPosition?.right || (position === "right" ? 0 : undefined),
    width: width || undefined,
    height: height || undefined,
  };

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
        <div className={styles.backdrop} onClick={handleClose}></div>
        <div
          className={`${styles.content} ${styles.center}`}
          style={modalStyle}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
          >
            Х
          </button>
          <p className={styles.title}>{title}</p>
          <div className={styles.mainContent}>{children}</div>
          <div className={styles.footer}>
            {footerButtons?.map((button, index) => (
              <button
                key={index}
                disabled={button.disabled}
                onClick={button.onClick}
              >
                {button.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
