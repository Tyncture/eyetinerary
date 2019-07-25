import {
  ItineraryEditTokens,
  ItineraryEditTokensAction,
  ADD_ITINERARY_EDIT_TOKEN,
  REMOVE_ITINERARY_EDIT_TOKEN,
  CLEAR_ITINERARY_EDIT_TOKENS,
} from "./types";

const initialState: ItineraryEditTokens = [];

export function itineraryEditTokens(
  state: ItineraryEditTokens,
  action: ItineraryEditTokensAction,
): ItineraryEditTokens {
  const prevState = state ? state : initialState;
  switch (action.type) {
    case ADD_ITINERARY_EDIT_TOKEN:
      return [...prevState, action.payload];
    case REMOVE_ITINERARY_EDIT_TOKEN:
      return prevState.filter(
        token =>
          token.id !== action.payload.id &&
          token.token !== action.payload.token,
      );
    case CLEAR_ITINERARY_EDIT_TOKENS:
      return initialState;
    default:
      return prevState;
  }
}
