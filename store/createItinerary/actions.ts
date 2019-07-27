import {
  CreateItineraryAction,
  SET_CREATE_ITINERARY_NAME,
  SET_CREATE_ITINERARY_DESCRIPTION,
  IPagePrototype,
  ADD_CREATE_ITINERARY_PAGE,
  REMOVE_CREATE_ITINERARY_PAGE,
  CLEAR_CREATE_ITINERARY,
} from "./types";

export function setCreateItineraryName(name: string): CreateItineraryAction {
  return {
    type: SET_CREATE_ITINERARY_NAME,
    name,
  };
}

export function setCreateItineraryDescription(
  description: string,
): CreateItineraryAction {
  return {
    type: SET_CREATE_ITINERARY_DESCRIPTION,
    description,
  };
}

export function addCreateItineraryPage(
  page: IPagePrototype,
): CreateItineraryAction {
  return {
    type: ADD_CREATE_ITINERARY_PAGE,
    payload: page,
  };
}

export function removeCreateItineraryPage(
  index: number,
): CreateItineraryAction {
  return {
    type: REMOVE_CREATE_ITINERARY_PAGE,
    index,
  };
}

export function clearCreateItinerary(): CreateItineraryAction {
  return {
    type: CLEAR_CREATE_ITINERARY,
  };
}
