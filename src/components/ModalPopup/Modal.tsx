import React, { ReactNode} from 'react';
import styles from "./Modal.module.sass"

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}


const Modal = (props: ModalType) => {
    return (
        <>
            {props.isOpen && (
                <div className={styles.box}>
                    {props.children}
                </div>
                /*<div className={styles.overlay} onClick={props.toggle}>
                    <div className={styles.box}>
                        {props.children}
                    </div>
                </div>*/
            )}
        </>

    );
};

export default Modal;