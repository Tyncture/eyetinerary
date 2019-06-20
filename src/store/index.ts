import { IUser, UserActionTypes } from "./user/types";
import { user } from "./user/reducer";

interface IStore {
  user: IUser;
}

type StoreActions = UserActionTypes;

export function store(state: IStore, action: StoreActions) {
  return {
    user: user(state.user, action)
  };
}