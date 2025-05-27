import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      // Return null or an empty object/specific type if user not found/authenticated
      // Throwing an error might be too disruptive for some UI components.
      // Consider what the calling code expects.
      return null;
    }
    // Fetch the user document from your "users" table using the clerkId
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique(); // Use .unique() as clerkId should be unique

    return user;
  },
});

// Mutation to store user data from Clerk or create if not exists
export const storeUser = mutation({
  args: {}, // No args needed as it uses the authenticated user's identity
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if user already exists
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (user !== null) {
      // If user already exists, you might want to update their info
      // if it has changed (e.g., name, profilePicture).
      // For now, we'll just return the existing user's ID.
      if (
        user.name !== identity.name ||
        user.email !== identity.email || // Clerk provides email in identity
        user.profilePicture !== identity.pictureUrl
      ) {
        await ctx.db.patch(user._id, {
          name: identity.name ?? "Unnamed User",
          email: identity.email!, // Email should be present
          profilePicture: identity.pictureUrl,
        });
      }
      return user._id;
    }

    // If user doesn't exist, create a new one
    const newUserId = await ctx.db.insert("users", {
      name: identity.name ?? "Unnamed User",
      email: identity.email!, // Email should be present from Clerk identity
      clerkId: identity.subject,
      profilePicture: identity.pictureUrl, // Clerk provides pictureUrl
      createdAt: Date.now(),
    });
    return newUserId;
  },
});