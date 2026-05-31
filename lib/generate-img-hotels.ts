import { Hotel } from "../types/trip";
import { fetchImage } from "./fetch-image";

export const generateImgForHotels = async (hotels: Hotel[]) => {
  if (!hotels) return [];
  const results = await Promise.allSettled(
    hotels.map(async (hotel) => {
      const placeName = hotel.hotel_name + " " + hotel.hotel_address;
      const imageUrl = await fetchImage(placeName, hotel.geo_coordinates);
      return {
        ...hotel,
        hotel_image_url: imageUrl,
      };
    }),
  );

  return results.map((result, idx) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return hotels[idx];
    }
  });
};
