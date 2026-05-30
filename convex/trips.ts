import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveNewTrip = mutation({
  args: {
    tripPlan: v.any(),
    shareId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Please sign in to save trips");
    }
    const email = identity.email;
    if (!email) {
      throw new Error(
        "Email claim missing in JWT token. Please configure the Clerk JWT Template for Convex.",
      );
    }

    const tripId = await ctx.db.insert("trips", {
      tripPlan: args.tripPlan,
      userEmail: email,
      shareId: args.shareId,
    });
    return tripId;
  },
});

export const getTrips = query({
  args: {},

  handler: async (ctx) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Unauthorized: Please sign in to view your trips");
      }
      const email = identity.email;
      if (!email) {
        throw new Error(
          "Email claim missing in JWT token. Please configure the Clerk Custom Session Fields for Convex.",
        );
      }

      const trips = await ctx.db
        .query("trips")
        .withIndex("by_email", (q) => q.eq("userEmail", email))
        .order("desc")
        .collect();
      return trips;
    } catch (error) {
      console.log("error while fetching trips", error);
    }
  },
});

export const getTripById = query({
  args: {
    tripId: v.id("trips"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Please sign in to view your trips");
    }
    const email = identity.email;
    if (!email) {
      throw new Error(
        "Email claim missing in JWT token. Please configure the Clerk Custom Session Fields for Convex.",
      );
    }
    const trip = await ctx.db.get(args.tripId);
    if (!trip) {
      return null;
    }
    if (trip.userEmail !== email) {
      return null;
    }
    return trip;
  },
});

export const deleteTrip = mutation({
  args: {
    tripId: v.id("trips"),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Unauthorized: Please sign in");
      }
      const email = identity.email;
      if (!email) {
        throw new Error(
          "Email claim missing in JWT token. Please configure the Clerk JWT Template for Convex.",
        );
      }

      const trip = await ctx.db.get(args.tripId);
      if (!trip) {
        throw new Error("Trip not found");
      }
      if (trip.userEmail !== email) {
        throw new Error(
          "Unauthorized: You do not have permission to delete this trip",
        );
      }

      await ctx.db.delete(args.tripId);
      return true;
    } catch (error) {
      console.log("something wrong while deleting", error);
    }
  },
});

export const shareTrip = query({
  args: {
    shareId: v.string(),
  },
  handler: async (ctx, args) => {
    const trip = await ctx.db
      .query("trips")
      .withIndex("by_shareId", (q) => q.eq("shareId", args.shareId))
      .unique();
    return trip;
  },
});
