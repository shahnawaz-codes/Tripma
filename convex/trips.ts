import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveNewTrip = mutation({
  args: {
    tripPlan: v.any(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const email = identity.email;

    const tripId = await ctx.db.insert("trips", {
      tripPlan: args.tripPlan,
      userEmail: email ?? "",
    });
    return tripId;
  },
});
export const getTrips = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const trips = await ctx.db
      .query("trips")
      .withIndex("by_email", (q) => q.eq("userEmail", args.email))
      .order("desc")
      .collect();
    return trips;
  },
});

export const getTripById = query({
  args: {
    tripId: v.id("trips"),
  },
  handler: async (ctx, agrs) => {
    // return the document of the trip with the given tripId
    return await ctx.db.get("trips", agrs.tripId);
  },
});

export const deleteTrip = mutation({
  args: {
    tripId: v.id("trips"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.tripId);
    return true;
  },
});
