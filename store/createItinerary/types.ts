import { Action } from "redux";

export interface IPagePrototype {
  name: string;
  description: string;
}

export interface ICreateItinerary {
  name: string;
  description: string;
  pages: IPagePrototype[];
}

export const SET_CREATE_ITINERARY_NAME = "SET_CREATE_ITINERARY_NAME";
export const SET_CREATE_ITINERARY_DESCRIPTION =
  "SET_CREATE_ITINERARY_DESCRIPTION";
export const ADD_CREATE_ITINERARY_PAGE = "ADD_CREATE_ITINERARY_PAGE";
export const REMOVE_CREATE_ITINERARY_PAGE = "REMOVE_ITINERARY_PAGE";
export const CLEAR_CREATE_ITINERARY = "CLEAR_CREATE_ITINERARY ";

interface ISetCreateItineraryNameAction {
  type: typeof SET_CREATE_ITINERARY_NAME;
  name: string;
}

interface ISetCreateItineraryDescriptionAction {
  type: typeof SET_CREATE_ITINERARY_DESCRIPTION;
  description: string;
}

interface IAddCreateItineraryPageAction {
  type: typeof ADD_CREATE_ITINERARY_PAGE;
  payload: IPagePrototype;
}

interface IRemoveCreateItineraryPageAction {
  type: typeof REMOVE_CREATE_ITINERARY_PAGE;
  index: number;
}

interface IClearCreateItineraryPageAction {
  type: typeof CLEAR_CREATE_ITINERARY;
}

export type CreateItineraryAction =
  | ISetCreateItineraryNameAction
  | ISetCreateItineraryDescriptionAction
  | IAddCreateItineraryPageAction
  | IRemoveCreateItineraryPageAction
  | IClearCreateItineraryPageAction;
