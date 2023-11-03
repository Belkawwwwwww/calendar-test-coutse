import { FC, useState } from "react";

interface DropdownProps {
  options: string[];
}

const Dropdown: FC<DropdownProps> = ({options}) => {
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOptionSelect = (option: string) => {
      setSelectedOption(option);
      setIsOpen(false);
    };

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div>
          <button onClick={toggleDropdown}>
            <img  src="/img/angle.svg" alt="" />
          </button>
          {isOpen && (
              <div>
                  {options &&
                      options.map((option) => (
                          <div
                              key={option}
                              onClick={() => handleOptionSelect(option)}
                          >
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