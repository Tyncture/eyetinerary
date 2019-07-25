import { Action } from "redux";
import {
  ADD_ITINERARY_EDIT_TOKEN,
  ItineraryEditTokensAction,
  REMOVE_ITINERARY_EDIT_TOKEN,
  CLEAR_ITINERARY_EDIT_TOKENS,
} from "./types";

export function addItineraryEditToken(
  itineraryId: number,
  editToken: string,
): ItineraryEditTokensAction {
  return {
    type: ADD_ITINERARY_EDIT_TOKEN,
    payload: {
      id: itineraryId,
      token: editToken,
    },
  };
}

export function removeItineraryEditToken(
  itineraryId: number,
  editToken: string,
): ItineraryEditTokensAction {
  return {
    type: REMOVE_ITINERARY_EDIT_TOKEN,
    payload: {
      id: itineraryId,
      token: editToken,
    },
  };
}

export function clearItineraryEditTokens(): ItineraryEditTokensAction {
  return { type: CLEAR_ITINERARY_EDIT_TOKENS };
}
