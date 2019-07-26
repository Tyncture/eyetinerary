export interface IItinerary {
  id: number;
  title: string;
  description: string;
  pages: Array<{
    id: number;
    title: string;
    description: string;
    position: number;
  }>;
}
