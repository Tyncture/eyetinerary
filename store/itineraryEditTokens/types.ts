import { Action } from "redux";

export interface IItineraryEditTokensElement {
  id: number;
  token: string;
}

export interface IItineraryEditTokens {
  [key: number]: IItineraryEditTokensElement;
}

export const ADD_ITINERARY_EDIT_TOKEN = "ADD_ITINERARY_EDIT_TOKEN";
export const REMOVE_ITINERARY_EDIT_TOKEN = "REMOVE_ITINERARY_EDIT_TOKEN";
export const CLEAR_ITINERARY_EDIT_TOKENS = "CLEAR_ITINERARY_EDIT_TOKENS";

interface IAddItineraryEditTokenAction extends Action<string> {
  payload: IItineraryEditTokensElement;
}

interface IRemoveItineraryEditTokenAction extends Action<string> {
  payload: IItineraryEditTokensElement;
}

interface IClearItineraryEditTokens extends Action<string> {
  payload?: undefined;
}

export type ItineraryEditTokensAction =
  | IAddItineraryEditTokenAction
  | IRemoveItineraryEditTokenAction
  | IClearItineraryEditTokens;
