import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel"; // Import the Id type

export const createClub = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    logoUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not authenticated");
    }
    const clerkId = identity.subject; // This is the Clerk User ID

    // Find the user in your Convex `users` table by their Clerk ID
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      // This can happen if the user authenticated with Clerk but isn't yet in your Convex `users` table.
      // You might have a separate user creation/sync logic (e.g., in auth.config.js or a user mutation).
      throw new Error("User not found in Convex database. Ensure user is synced after sign-up.");
    }

    // Now `user._id` is of type Id<"users">
    const convexUserId: Id<"users"> = user._id;

    const clubId = await ctx.db.insert("clubs", {
      name: args.name,
      description: args.description,
      logoUrl: args.logoUrl,
      createdBy: convexUserId, // Use the Convex user's _id
      createdAt: Date.now(),
    });
    return clubId;
  },
});