import React from "react";

interface InputProps {
  type: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  type,
  id,
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      //required={types === 'checkbox' ? false : true}
    ></input>
  );
};

export default FormInput;
