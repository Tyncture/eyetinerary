import {
  IContextUser,
  SET_USERNAME,
  SET_USER_ID,
  SET_USER_TOKEN,
  UserActionTypes,
  CLEAR_USER
} from "./types";

const initialState: IContextUser = {
  id: null,
  username: null,
  token: null
};

export function user(
  state: IContextUser,
  action: UserActionTypes
): IContextUser {
  const prevState = state ? state : initialState;
  switch (action.type) {
    case SET_USER_ID:
      return { ...prevState, id: action.id };
    case SET_USERNAME:
      return { ...prevState, username: action.username };
    case SET_USER_TOKEN:
      return { ...prevState, token: action.token };
    case CLEAR_USER:
      return initialState;
    default:
      return prevState;
  }
}
