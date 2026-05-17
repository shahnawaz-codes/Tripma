export type TripPlan = {
  destination: string;
  duration: string;
  origin: string;
  budget: string;
  group_size: string;
  hotels: Hotel[];
  itinerary: Itinerary[];
};
export type Hotel = {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: GeoCoordinates;
  rating: number;
  description: string;
};
export type GeoCoordinates = {
  latitude: number;
  longitude: number;
};
export type Itinerary = {
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activities[];
};

export type Activities = {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: GeoCoordinates;
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
};
