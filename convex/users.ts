import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    imgUrl: v.string(),
  },
  handler: async (ctx, args) => {
    //--- if user is new then insert data into db
    // RETURNS -> array of user data
    const isUserExist = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();

    if (isUserExist.length === 0) {
      const newUser = {
        email: args.email,
        name: args.name,
        imgUrl: args.imgUrl,
      };
      await ctx.db.insert("users", newUser);
      return newUser;
    }
    return isUserExist[0];
  },
});
