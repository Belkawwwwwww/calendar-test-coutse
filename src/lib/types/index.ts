import React from "react";

export interface IUser {
  username: string;
}

export type IRoute = {
  path: string;
  element: React.ReactNode;
  action?: any;
};

export interface IBoard {
  id: number;
  user_id: number;
  name_board: string;
  created: string;
  updated: string;
  deletedAt: string | null;
}

export interface IResponse<T = never> {
  statusCode: number;
  message?: string;
  data?: T;
}

export interface ICard {
  id: number;
  user_id: number;
  board_id: number;
  card_name: string;
  deletedAt: string | null;
  created: string;
  updated: string;
  content: string | null;
}

export interface IList {
  id: number;
  created: string;
  updated: string;
  deletedAt: string | null;
  title: string;
  content: string;
  board_id: number;
  card_id: number;
  user_id: number;
}
