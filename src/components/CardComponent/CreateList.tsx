import React from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { isListSelector } from "../../store/slices/ListSlice";

interface CreateListProps {
  board_id: number;
}

const CreateList = () => {
  const lists = useAppSelector(isListSelector);
  return <div></div>;
};

export default CreateList;
