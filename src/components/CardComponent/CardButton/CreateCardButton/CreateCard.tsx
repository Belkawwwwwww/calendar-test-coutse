import React, { FC } from "react";
import CreateCardButton from "./CreateCardButton";
import { useAppSelector } from "../../../../store/hooks/redux";
import { isBoardsSelector } from "../../../../store/slices/BoardSlice";

interface CreateCardProps {
  boardId: number;
}
const CreateCard: FC<CreateCardProps> = ({ boardId }) => {
  const boards = useAppSelector(isBoardsSelector);

  return (
    <>
      {boards?.map((board) => {
        if (board.id === Number(boardId)) {
          return <CreateCardButton key={board.id} boardId={board.id} />;
        } else {
          return null;
        }
      })}
    </>
  );
};

export default CreateCard;
