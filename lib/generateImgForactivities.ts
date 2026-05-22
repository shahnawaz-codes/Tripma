import { Itinerary } from "@/types/trip";
import { fetchImage } from "@/utils/fetchImage";

export const generateImgForactivities = async (itinerary: Itinerary[]) => {
  return await Promise.all(
    itinerary?.map(async (it) => {
      const activityWithImages = await Promise.all(
        it.activities?.map(async (activity) => {
          const placeName = activity.place_name + " " + activity.place_address;
          const imageUrl = await fetchImage(
            placeName,
            activity.geo_coordinates,
          );
          return {
            ...activity,
            place_image_url: imageUrl,
          };
        }),
      );
      return {
        ...it,
        activities: activityWithImages,
      };
    }),
  );
};
