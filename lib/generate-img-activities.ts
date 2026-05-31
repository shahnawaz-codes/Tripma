import { Itinerary } from "../types/trip";
import { fetchImage } from "./fetch-image";

export const generateImgForactivities = async (itinerary: Itinerary[]) => {
  if (!itinerary) return [];
  const results = await Promise.allSettled(
    itinerary.map(async (day) => {
      const activitiesResults = await Promise.allSettled(
        day.activities?.map(async (activity) => {
          const placeName = activity.place_name + " " + activity.place_address;
          const imageUrl = await fetchImage(
            placeName,
            activity.geo_coordinates,
          );
          return {
            ...activity,
            place_image_url: imageUrl,
          };
        }) || [],
      );

      const activities = activitiesResults.map((result, idx) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          return day.activities[idx];
        }
      });

      return {
        ...day,
        activities,
      };
    }),
  );

  return results.map((result, idx) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return itinerary[idx];
    }
  });
};
