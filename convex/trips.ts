import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveNewTrip = mutation({
  args: {
    tripPlan: v.any(),
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    
    const tripId = await ctx.db.insert("trips", {
      tripPlan: args.tripPlan,
      userEmail: args.userEmail,
    });
    return tripId;
  },
});
export const getTrips = query({
  args: {},
  handler: () => {},
});
