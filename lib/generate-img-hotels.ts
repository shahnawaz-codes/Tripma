import { Hotel } from "@/types/trip";
import { fetchImage } from "@/lib/fetch-image";

export const generateImgForHotels = async (hotels: Hotel[]) => {
  return await Promise.all(
    hotels?.map(async (hotel) => {
      const placeName = hotel.hotel_name + " " + hotel.hotel_address;
      const imageUrl = await fetchImage(placeName, hotel.geo_coordinates);
      return {
        ...hotel,
        hotel_image_url: imageUrl,
      };
    }),
  );
};
