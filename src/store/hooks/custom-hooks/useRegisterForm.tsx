import { ChangeEvent, useState } from "react";

export const useRegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onHandlerUser = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    }
  };
  return {
    username,
    password,
    passwordConfirm,
    showPassword,
    handleToggleShowPassword,
    onHandlerUser,
  };
};
