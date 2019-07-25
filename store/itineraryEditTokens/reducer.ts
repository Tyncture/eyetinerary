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
      return { ...prevState, [String(action.payload.id)]: action.payload };
    case REMOVE_ITINERARY_EDIT_TOKEN:
      const successor = {};
      const elements = Object.keys(prevState).map(key => prevState[key]);
      const elementsToKeep: IItineraryEditTokensElement[] = elements.filter(
        value =>
          value.id !== action.payload.id &&
          value.token !== action.payload.token,
      );
      elementsToKeep.forEach(
        element => (successor[String(element.id)] = element),
      );
      return successor;
    case CLEAR_ITINERARY_EDIT_TOKENS:
      return initialState;
    default:
      return prevState;
  }
}
