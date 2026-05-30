import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    imgUrl: v.string(),
    email: v.string(),
    subscription: v.optional(v.string()),
  }).index("by_email", ["email"]),
  trips: defineTable({
    userEmail: v.string(),
    shareId: v.optional(v.string()),
    tripPlan: v.object({
      destination: v.string(),
      duration: v.string(),
      origin: v.string(),
      budget: v.string(),
      group_size: v.string(),
      hotels: v.array(
        v.object({
          hotel_name: v.string(),
          hotel_address: v.string(),
          price_per_night: v.string(),
          hotel_image_url: v.string(),
          geo_coordinates: v.object({
            latitude: v.number(),
            longitude: v.number(),
          }),
          rating: v.number(),
          description: v.string(),
        }),
      ),
      itinerary: v.array(
        v.object({
          day: v.number(),
          day_plan: v.string(),
          best_time_to_visit_day: v.string(),
          activities: v.array(
            v.object({
              place_name: v.string(),
              place_details: v.string(),
              place_image_url: v.string(),
              geo_coordinates: v.object({
                latitude: v.number(),
                longitude: v.number(),
              }),
              place_address: v.string(),
              ticket_pricing: v.string(),
              time_travel_each_location: v.string(),
              best_time_to_visit: v.string(),
            }),
          ),
        }),
      ),
    }),
  })
    .index("by_email", ["userEmail"])
    .index("by_shareId", ["shareId"]),
});
