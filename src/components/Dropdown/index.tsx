import React, { FC, useState } from "react";
import styles from "./index.module.sass";
import { useAppSelector } from "../../store/hooks/redux";
import { userDataSelector } from "../../store/slices/UserSlice";

interface DropdownProps {
  options: string[];
}

const Dropdown: FC<DropdownProps> = ({options}) => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = useAppSelector(userDataSelector);


    const handleOptionSelect = (option: string) => {
      setSelectedOption(option);
      setIsOpen(false);
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
        <div className={styles.button} onClick={toggleDropdown}>
          <div className={styles.user}>
            {user.username} : Ваши созданные доски
          </div>
          <div className={styles.angle}>
            <img className={styles.angle} src="/img/angle.svg" alt="" />
          </div>
        </div>
        {isOpen && (
          <div className={styles.board}>
            {options &&
              options.map((option) => (
                <div className={styles.boards} key={option} onClick={() => handleOptionSelect(option)}>
                  {option}
                </div>
              ))}
          </div>
        )}
        {selectedOption && <p>Selected board: {selectedOption}</p>}
      </div>
    );
}
export default Dropdown;