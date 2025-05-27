import { mutation,query} from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const addMember = mutation({
  args: {
    clubId: v.id("clubs"),
    // userId might come from auth or be passed if an admin is adding someone
    role: v.union(
      v.literal("president"),
      v.literal("vice_president"),
      v.literal("treasurer"),
      v.literal("member"),
      v.literal("alumni")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not authenticated");
    }
    const userId = identity.subject as Id<"users">; // Cast if confident, or fetch user by subject

    // Check if user is already a member (optional, good practice)
    const existingMembership = await ctx.db
      .query("memberships")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("clubId"), args.clubId))
      .first();

    if (existingMembership) {
      throw new Error("User is already a member of this club.");
    }

    const membershipId = await ctx.db.insert("memberships", {
      userId: userId,
      clubId: args.clubId, // This comes as Id<"clubs"> from args
      role: args.role,     // Must be one of the literals
      joinedAt: Date.now(),
    });
    return membershipId;
  },
});

export const getMembers = query({
  args: {
    clubId: v.id("clubs"),
  },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("memberships")
      .withIndex("by_club", (q) => q.eq("clubId", args.clubId))
      .collect();

    return members;
  },
});

// ... other membership mutations