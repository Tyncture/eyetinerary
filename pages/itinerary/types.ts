export interface IPage {
  id: number;
  title: string;
  description: string;
  rankInItinerary: number;
}

export interface IItinerary {
  id: number;
  title: string;
  description: string;
  pages: IPage[];
}
