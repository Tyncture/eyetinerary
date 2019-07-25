export const SET_USER_ID = "SET_USER_ID";
export const SET_USERNAME = "SET_USERNAME";
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const CLEAR_USER = "CLEAR_USER";

export interface IUser {
  id: number;
  username: string;
  token: string;
}

interface ISetUserIdAction {
  type: typeof SET_USER_ID;
  id: number;
}

interface ISetUsernameAction {
  type: typeof SET_USERNAME;
  username: string;
}

interface ISetUserTokenAction {
  type: typeof SET_USER_TOKEN;
  token: string;
}

interface IClearUserAction {
  type: typeof CLEAR_USER;
}

export type UserActionTypes =
  | ISetUserIdAction
  | ISetUsernameAction
  | ISetUserTokenAction
  | IClearUserAction;
