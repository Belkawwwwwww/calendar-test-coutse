export interface IUser {
  username: string;
}

export interface IBoard {
  boardId: number;
  nameBoard: string;
  //cards: ICards[]
}

export interface IResponse {
  statusCode: number;
  message: string;
  data?: any;
}
export interface IResponseData {
  [boardId: number]: ICards[];
}
export interface ICards {
  boardId: number
  cardId: number;
  nameCard: string
}