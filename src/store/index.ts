import { IUser, UserActionTypes } from "./user/types";
import { user } from "./user/reducer";

interface IStore {
  user: IUser;
}

const initialState: IStore = {
  user: {
    id: null,
    username: null,
    token: null
  }
};

type StoreActions = UserActionTypes;

export function store(state: IStore=initialState, action: StoreActions) {
  return {
    user: user(state.user, action)
  };
}