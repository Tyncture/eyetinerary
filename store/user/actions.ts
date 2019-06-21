import {
  CLEAR_USER,
  SET_USERNAME,
  SET_USER_ID,
  SET_USER_TOKEN,
  UserActionTypes
} from "./types";

export function setUserId(id: number): UserActionTypes {
  return {
    type: SET_USER_ID,
    id
  };
}

export function setUsername(username: string): UserActionTypes {
  return {
    type: SET_USERNAME,
    username
  };
}

export function setUserToken(token: string): UserActionTypes {
  return {
    type: SET_USER_TOKEN,
    token
  };
}

export function clearUser(): UserActionTypes {
  return {
    type: CLEAR_USER
  };
}
