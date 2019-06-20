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

export function user(
  state: IUser = initialState,
  action: UserActionTypes
): IUser {
  switch (action.type) {
    case SET_USER_ID:
      return Object.assign({}, state, { id: action.id });
    case SET_USERNAME:
      return Object.assign({}, state, { username: action.username });
    case SET_USER_TOKEN:
      return Object.assign({}, state, { token: action.token });
    default:
      return state;
  }
}
