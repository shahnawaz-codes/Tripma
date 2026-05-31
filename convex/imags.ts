import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { generateImgForHotels } from "../lib/generate-img-hotels";
import { generateImgForactivities } from "../lib/generate-img-activities";
import { Hotel, Itinerary } from "../types/trip";
import { internal } from "./_generated/api";

export const genImage = internalAction({
  args: {
    tripId: v.id("trips"),
  },
  handler: async (ctx, args) => {
    try {
      const trip = await ctx.runQuery(internal.trips.getTripRaw, {
        tripId: args.tripId,
      });
      const hotelWithImage = await generateImgForHotels(
        trip?.tripPlan.hotels as Hotel[],
      );
      const itineraryWithImage = await generateImgForactivities(
        trip?.tripPlan.itinerary as Itinerary[],
      );

      // update the image with status
      await ctx.runMutation(internal.trips.updateTripImages, {
        tripId: args.tripId,
        hotelWithImage,
        itineraryWithImage,
      });
    } catch (error) {}
  },
});
