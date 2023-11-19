export interface IUser {
  username: string;
}

export interface IBoard {
  id: number;
  nameBoard: string;
}

export interface IResponse {
  answercode: number;
  answer: string;
  data?: any;
}

export interface ICards {}