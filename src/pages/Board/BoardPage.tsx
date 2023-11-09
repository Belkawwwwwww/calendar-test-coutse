import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { isNameBoardSelector } from "../../store/slices/BoardSlice";
import { getBoard } from "../../store/action/boardAction";

const BoardPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const board = useAppSelector(isNameBoardSelector);

  useEffect(() => {
    dispatch(getBoard(id));
  }, [id]);
  return(
      <div>
        <h1>Board Page</h1>
        {board ? (
            <div>
              <p>Board ID: {board.id}</p>
              <p>Board Name: {board.name}</p>
            </div>
        ): null}
      </div>
      )

};

export default BoardPage;
