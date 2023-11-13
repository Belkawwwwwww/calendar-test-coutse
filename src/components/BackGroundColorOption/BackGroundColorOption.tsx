import React, { useState } from "react";

interface ColorOption {
    name: string;
    color: string;
}

const BackgroundColorOptions: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState<string>("");

    const handleColorClick = (color: string) => {
        setSelectedColor(color);
    };

    const colorOptions: ColorOption[] = [
        { name: "Red", color: "red" },
        { name: "Blue", color: "blue" },
        { name: "Green", color: "green" },
        { name: "Yellow", color: "yellow" },
    ];

    return (
        <div>
            <h2>Select Background Color:</h2>
            <div style={{ display: "flex" }}>
                {colorOptions.map((option) => (
                    <div
                        key={option.color}
                        onClick={() => handleColorClick(option.color)}
                        style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: option.color,
                            margin: "5px",
                            cursor: "pointer",
                            border: "2px solid",
                            borderColor:
                                selectedColor === option.color ? "black" : "transparent",
                        }}
                    />
                ))}
            </div>
            {selectedColor ? (
                <div>
                    You selected:{" "}
                    <span style={{ color: selectedColor }}>{selectedColor}</span>
                </div>
            ): null}
        </div>
    );
};

export default BackgroundColorOptions;