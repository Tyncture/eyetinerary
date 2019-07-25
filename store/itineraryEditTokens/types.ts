import { Action } from "redux";

export interface IItineraryEditTokensElement {
  id: number;
  token: string;
}

export type ItineraryEditTokens = IItineraryEditTokensElement[];

export const ADD_ITINERARY_EDIT_TOKEN = "ADD_ITINERARY_EDIT_TOKEN";
export const REMOVE_ITINERARY_EDIT_TOKEN = "REMOVE_ITINERARY_EDIT_TOKEN";
export const CLEAR_ITINERARY_EDIT_TOKENS = "CLEAR_ITINERARY_EDIT_TOKENS";

interface IAddItineraryEditTokenAction extends Action<string> {
  token: IItineraryEditTokensElement;
}

interface IRemoveItineraryEditTokenAction extends Action<string> {
  token: IItineraryEditTokensElement;
}

interface IClearItineraryEditTokens extends Action<string> {
  token?: undefined;
}

export type ItineraryEditTokensAction =
  | IAddItineraryEditTokenAction
  | IRemoveItineraryEditTokenAction
  | IClearItineraryEditTokens;
