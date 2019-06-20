import {
  IUser,
  SET_USERNAME,
  SET_USER_ID,
  SET_USER_TOKEN,
  UserActionTypes
} from "./types";

const initialState: IUser = {
  id: null,
  username: null,
  token: null
};

export function user(state: IUser, action: UserActionTypes): IUser {
  const prevState = state ? state : initialState;
  switch (action.type) {
    case SET_USER_ID:
      return Object.assign({}, prevState, { id: action.id });
    case SET_USERNAME:
      return Object.assign({}, prevState, { username: action.username });
    case SET_USER_TOKEN:
      return Object.assign({}, prevState, { token: action.token });
    default:
      return prevState;
  }
}
