import { Activities, Itinerary } from "@/types/trip";
import { fetchImage } from "@/utils/fetchImage";

export const generateImgForactivities = async (itinerary: Itinerary[]) => {
  return await Promise.all(
    itinerary.map(async (it) => {
      return await Promise.all(
        it.activities.map(async (activity) => {
          const placeName = activity.place_name + " " + activity.place_address;
          const imageUrl = await fetchImage(
            placeName,
            activity.geo_coordinates,
          );
          return {
            ...it.activities,
            place_image_url: imageUrl,
          };
        }),
      );
    }),
  );
};
