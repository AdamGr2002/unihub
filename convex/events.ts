import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getMembership } from "./utils/getMembership"; // Assuming this utility is correctly defined
import { Id } from "./_generated/dataModel";

export const createEvent = mutation({
  args: {
    clubId: v.id("clubs"),
    title: v.string(),
    description: v.string(),
    date: v.number(),
    location: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Authentication: Ensure a user is logged in and get their Convex user ID.
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error(
        "User not authenticated. Please sign in to create an event."
      );
    }

    const clerkId = identity.subject; // This is the Clerk User ID (string)

    // Find the user in your Convex `users` table by their Clerk ID
    // Assumes you have an index on `clerkId` in your `users` table schema:
    // .index("by_clerkId", ["clerkId"])
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      // This can happen if the user authenticated with Clerk but isn't yet in your Convex `users` table.
      // You should have logic (e.g., in auth.config.js or a user creation mutation) to sync Clerk users to your Convex `users` table.
      throw new Error("User not found in Convex database. Ensure user is synced after sign-up.");
    }

    const convexUserId: Id<"users"> = user._id; // This is the Id<"users">

    // 2. Authorization: Check if the user has the required role in the club.
    // `getMembership` should fetch the membership record for the user in the specified club.
    const membership = await getMembership(ctx, convexUserId, args.clubId);

    if (!membership) {
      throw new Error(
        "Permission denied. User is not a member of this club."
      );
    }
    // For example, check if membership.role allows event creation
    if (membership.role !== "president" && membership.role !== "vice_president") { // Example roles
        throw new Error("Permission denied. User does not have the required role to create events.");
    }

    // 3. Create the event
    const eventId = await ctx.db.insert("events", {
      clubId: args.clubId,
      title: args.title,
      description: args.description,
      date: args.date,
      location: args.location,
      createdBy: convexUserId, // Use the Convex user ID
      attendees: [], // Initialize with an empty array of attendees
    });

    return eventId;
  },
});

/*
Assumed structure for `getMembership` (e.g., in `convex/utils/getMembership.ts`):

import { QueryCtx, MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export const getMembership = async (
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users">,
  clubId: Id<"clubs">
) => {
  // Ensure you have an appropriate index in `convex/schema.ts` for this query,
  // e.g., memberships.index("by_user_and_club", ["userId", "clubId"])
  const membership = await ctx.db
    .query("memberships")
    .withIndex("by_user_and_club", (q) => // Or your existing index like "by_user" then filter by club
      q.eq("userId", userId).eq("clubId", clubId)
    )
    .unique(); // or .first() if unique() isn't guaranteed by the index alone

  return membership; // Returns the membership document or null if not found
};

*/