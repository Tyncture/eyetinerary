export interface IItem {
  id?: number;
  title?: string;
  body?: string;
}

export interface IPage {
  id?: number;
  title?: string;
  description?: string;
  items?: IItem[];
}

export interface IItinerary {
  id?: number;
  title?: string;
  description?: string;
  location?: string;
  countryCode?: string;
  pages?: IPage[];
}

