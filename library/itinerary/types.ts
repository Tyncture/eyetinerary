export interface IItem {
  id: number;
  title: string;
  body: string;
}

export interface IPage {
  id: number;
  title: string;
  description: string;
  rankInItinerary: number;
  items: IItem[];
}

export interface IItinerary {
  id: number;
  title: string;
  description: string;
  pages: IPage[];
  owner: {
    id: number;
    username: string;
  };
}
