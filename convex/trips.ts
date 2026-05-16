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
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const trips = await ctx.db.query("trips").filter((q) => {
      return q.eq(q.field("userEmail"), args.email);
    });
    return trips;
  },
});

export const getTripById = query({
  args: {
    tripId: v.id("trips"),
  },
  handler: async (ctx, agrs) => {
    return await ctx.db.get("trips", agrs.tripId);
  },
});
