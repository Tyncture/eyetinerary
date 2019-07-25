import { IUser, UserActionTypes } from "./user/types";
import { user } from "./user/reducer";
import { createStore, Store, combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  Persistor
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { itineraryEditTokens } from "./itineraryEditTokens/reducer";

// Root reducer
export const rootReducer = combineReducers({
  user, itineraryEditTokens
});

// redux-persist persistent store
const config: PersistConfig = {
  key: "persistentState",
  storage,
  whitelist: ["user", "itineraryEditTokens"]
};

const persistedReducer = persistReducer(config, rootReducer);

export function createPersistedStore(): { store: Store; persistor: Persistor } {
  const store = createStore(persistedReducer, composeWithDevTools());
  const persistor = persistStore(store);
  return { store, persistor };
}
