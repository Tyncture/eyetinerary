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
import { createItinerary } from "./createItinerary/reducer";
import { IStoreState } from "./types";

// Root reducer
export const rootReducer = combineReducers({
  user, itineraryEditTokens, createItinerary
}) as (state: IStoreState, action: {}) => IStoreState;

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
