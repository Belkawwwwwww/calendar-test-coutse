import React, { FC, ReactElement } from "react";
import styles from "./ToolTip.module.sass";

type PropsType = {
  children: ReactElement;
  text: string;
};

const ToolTip: FC<PropsType> = ({children, text}) => {
    return (
        <div className={styles.container}>
            {children}
            <div className={styles.tooltip}>
                {text}
            </div>
        </div>
    );
};

export default ToolTip;