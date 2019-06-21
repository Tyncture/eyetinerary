import { IContextUser, UserActionTypes } from "./user/types";
import { user } from "./user/reducer";
import { createStore, Store, StoreEnhancer } from "redux";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  Persistor
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

// Root reducer
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

export function rootReducer(
  state: IStore = initialState,
  action: StoreActions
) {
  return {
    user: user(state.user, action)
  };
}

// redux-persist persistent store
const config: PersistConfig = {
  key: "persistentState",
  storage,
  whitelist: ["user"]
};

const persistedReducer = persistReducer(config, rootReducer);

export function createPersistedStore(): { store: Store; persistor: Persistor } {
  const store = createStore(persistedReducer, composeWithDevTools());
  const persistor = persistStore(store);
  return { store, persistor };
}
