import {
  IItineraryEditTokens,
  ItineraryEditTokensAction,
  ADD_ITINERARY_EDIT_TOKEN,
  REMOVE_ITINERARY_EDIT_TOKEN,
  CLEAR_ITINERARY_EDIT_TOKENS,
  IItineraryEditTokensElement,
} from "./types";

const initialState: IItineraryEditTokens = {};

export function itineraryEditTokens(
  state: IItineraryEditTokens,
  action: ItineraryEditTokensAction,
): IItineraryEditTokens {
  const prevState = state ? state : initialState;
  switch (action.type) {
    case ADD_ITINERARY_EDIT_TOKEN:
      return { ...prevState, [action.payload.id]: action.payload };
    case REMOVE_ITINERARY_EDIT_TOKEN:
      const values: IItineraryEditTokensElement[] = Object.keys(prevState).map(
        key => prevState[key],
      );
      return {
        ...values.filter(
          value =>
            value.id !== action.payload.id &&
            value.token !== action.payload.token,
        ),
      };
    case CLEAR_ITINERARY_EDIT_TOKENS:
      return initialState;
    default:
      return prevState;
  }
}
