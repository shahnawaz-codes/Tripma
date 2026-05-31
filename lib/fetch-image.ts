import { GeoCoordinates } from "../types/trip";
import { getWikipediaImage } from "./wikipedia";

export const fetchImage = async (
  placeName: string,
  geoCoordinates: GeoCoordinates,
) => {
  try {
    const { latitude, longitude } = geoCoordinates || {};
    if (!placeName || !latitude || !longitude) {
      return "https://placehold.co/600x800.png?text=Image+Unavailable";
    }
    const imageUrl = await getWikipediaImage(placeName, latitude, longitude);
    return imageUrl || "https://placehold.co/600x800.png?text=Image+Unavailable";
  } catch (error) {
    console.log("Error in fetchImage:", error);
    return "https://placehold.co/600x800.png?text=Image+Unavailable";
  }
};
