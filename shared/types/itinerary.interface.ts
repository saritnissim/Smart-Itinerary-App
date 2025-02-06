export interface Itinerary {
  id?: number;
  user_id: number;
  destination_id: any;
  destination?: string;
  start_date: string;
  end_date: string;
  isFavorite?: boolean;
}
