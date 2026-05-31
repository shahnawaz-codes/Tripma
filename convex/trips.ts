import { v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";

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
      imagStatus: "pending",
    });
    // schedule background job -> this runs in bg after trip created. after created it pushed real-time to the client due to useQuery hook
    await ctx.scheduler.runAfter(0, internal.imags.genImage, { tripId });
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

export const getTripRaw = internalQuery({
  args: { tripId: v.id("trips") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.tripId);
  },
});

export const updateTripImages = internalMutation({
  args: {
    tripId: v.id("trips"),
    hotelWithImage: v.array(v.any()),
    itineraryWithImage: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const { tripId, hotelWithImage, itineraryWithImage } = args;
    const trip = await ctx.db.get(tripId);
    if (!trip) {
      throw new Error(`Trip with ID ${tripId} not found`);
    }
    await ctx.db.patch("trips", tripId, {
      imagStatus: "completed",
      tripPlan: {
        ...trip.tripPlan,
        hotels: hotelWithImage,
        itinerary: itineraryWithImage,
      },
    });
  },
});
