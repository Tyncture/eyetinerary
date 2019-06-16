export interface IItem {
  id?: number;
  title?: string;
  body?: string;
  page?: IPage;
  rankInPage?: number;
  created?: string;
  updated?: string;
}

export interface IPage {
  id?: number;
  title?: string;
  description?: string;
  items?: IItem[];
  itinerary?: IItinerary;
  rankInItinerary?: number;
  created?: string;
  updated?: string;
}

export interface IItinerary {
  id?: number;
  title?: string;
  description?: string;
  location?: string;
  countryCode?: string;
  pages?: IPage[];
  owner?: {
    id: number
  };
  created?: string;
  updated?: string;
}

