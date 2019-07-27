import { SetStateAction } from "react";

export interface IItineraryPrototype {
  name: string;
  description?: string;
}

export interface IPagePrototype {
  name: string;
  description: string;
}


export interface ICreateStepProps {
  step: number;
  setStep: React.Dispatch<SetStateAction<number>>;
  itinerary: IItineraryPrototype;
  setItinerary: React.Dispatch<SetStateAction<IItineraryPrototype>>;
  pages: IPagePrototype[];
  setPages: React.Dispatch<SetStateAction<IPagePrototype[]>>;
}
