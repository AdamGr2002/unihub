import { QueryCtx, MutationCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Gets the Convex user document based on the authenticated Clerk identity
export const getConvexUser = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .unique();
  return user;
};

// Gets a user's membership details for a specific club
export const getMembership = async (
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users">,
  clubId: Id<"clubs">
) => {
  const membership = await ctx.db
    .query("memberships")
    .withIndex("by_user", (q) => q.eq("userId", userId)) // Use existing index
    .filter((q) => q.eq(q.field("clubId"), clubId))
    .first();
  return membership;
};

// Example of an authorization check
export const ensureClubAdmin = async (
  ctx: QueryCtx | MutationCtx,
  userId: Id<"users">,
  clubId: Id<"clubs">
) => {
  const membership = await getMembership(ctx, userId, clubId);
  if (!membership || (membership.role !== "president" && membership.role !== "vice_president")) {
    throw new Error("User is not an admin of this club.");
  }
  return membership;
};