import { IItineraryEditTokens } from "./itineraryEditTokens/types";
import { ICreateItinerary } from "./createItinerary/types";
import { IUser } from "./user/types";

export interface IStoreState {
  user: IUser;
  itineraryEditTokens: IItineraryEditTokens;
  createItinerary: ICreateItinerary;
}
