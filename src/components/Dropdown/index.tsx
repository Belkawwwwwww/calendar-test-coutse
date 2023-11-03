import {FC, useEffect, useState} from "react";

interface DropdownProps {
    options: string[]
}

const Dropdown: FC<DropdownProps> = ({options}) => {
    const [selectedOption, setSelectedOption] = useState<string>("")

    useEffect(() => {
        if(options && options.length > 0) {
            setSelectedOption(options[0])
        }
    }, [options]);
    const handleOptionSelect = (option: string) => {
        setSelectedOption(option)
    }
    return (
        <div>
            <label htmlFor="">Select a board:</label>
            <select
                value={selectedOption}
                onChange={(e) => handleOptionSelect(e.target.value)}
            >
                <option value="">Select</option>
                {options &&
                    options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
            {selectedOption && <p>Selected board: {selectedOption}</p>}
        </div>
    )
}
export default Dropdown;