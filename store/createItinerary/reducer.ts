import {
  ICreateItinerary,
  CreateItineraryAction,
  SET_CREATE_ITINERARY_NAME,
  SET_CREATE_ITINERARY_DESCRIPTION,
  ADD_CREATE_ITINERARY_PAGE,
  REMOVE_CREATE_ITINERARY_PAGE,
  CLEAR_CREATE_ITINERARY,
} from "./types";

const initialState: ICreateItinerary = {
  name: "",
  description: "",
  pages: [],
};

/*
* Motivation:
* Passing state and state setters down as props would cause the
* component tree to rerender when the setter is called. Using the
* Redux store and only subscribing components that should rerender
* to the relevant parts of the state mitigates this.
*/

export function createItinerary(
  state: ICreateItinerary,
  action: CreateItineraryAction,
): ICreateItinerary {
  const prevState = state ? state : initialState;
  switch (action.type) {
    case SET_CREATE_ITINERARY_NAME:
      return { ...prevState, name: action.name };
    case SET_CREATE_ITINERARY_DESCRIPTION:
      return { ...prevState, description: action.description };
    case ADD_CREATE_ITINERARY_PAGE:
      return {
        ...prevState,
        pages: [...prevState.pages, action.payload],
      };
    case REMOVE_CREATE_ITINERARY_PAGE:
      const remainingPages = prevState.pages.filter(
        (_, index) => index !== action.index,
      );
      return { ...prevState, pages: remainingPages };
    case CLEAR_CREATE_ITINERARY:
      return initialState;
    default:
      return prevState;
  }
}
