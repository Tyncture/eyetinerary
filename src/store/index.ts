import { IContextUser, UserActionTypes } from "./user/types";
import { user } from "./user/reducer";

interface IStore {
  user: IContextUser;
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