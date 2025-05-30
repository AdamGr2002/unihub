import { mutation, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { getConvexUser, getMembership } from "./utils"; // Assuming utils.ts

// Helper to check if user is treasurer or president
const ensureTreasurerOrPresident = async (
  ctx: MutationCtx,
  userId: Id<"users">,
  clubId: Id<"clubs">
) => {
  const membership = await getMembership(ctx, userId, clubId);
  if (!membership || (membership.role !== "treasurer" && membership.role !== "president")) {
    throw new Error("User must be a treasurer or president to manage finances.");
  }
  return membership;
};

export const addTransaction = mutation({
  args: {
    clubId: v.id("clubs"),
    type: v.union(v.literal("income"), v.literal("expense")),
    amount: v.number(),
    description: v.string(),
    date: v.number(), // Timestamp of the transaction
  },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    await ensureTreasurerOrPresident(ctx, user._id, args.clubId);

    if (args.amount <= 0) {
        throw new Error("Transaction amount must be positive.");
    }

    await ctx.db.insert("finances", {
      ...args,
      recordedBy: user._id,
    });
    return { success: true };
  },
});

export const updateTransaction = mutation({
  args: {
    transactionId: v.id("finances"),
    type: v.optional(v.union(v.literal("income"), v.literal("expense"))),
    amount: v.optional(v.number()),
    description: v.optional(v.string()),
    date: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    const transaction = await ctx.db.get(args.transactionId);
    if (!transaction) throw new Error("Transaction not found.");

    await ensureTreasurerOrPresident(ctx, user._id, transaction.clubId);
    
    if (args.amount !== undefined && args.amount <= 0) {
        throw new Error("Transaction amount must be positive.");
    }

    const { transactionId, ...updates } = args;
    if (Object.keys(updates).length === 0) {
        throw new Error("No updates provided for the transaction.");
    }
    await ctx.db.patch(transactionId, updates);
    return { success: true };
  },
});

export const deleteTransaction = mutation({
  args: { transactionId: v.id("finances") },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    const transaction = await ctx.db.get(args.transactionId);
    if (!transaction) throw new Error("Transaction not found.");

    await ensureTreasurerOrPresident(ctx, user._id, transaction.clubId);

    await ctx.db.delete(args.transactionId);
    return { success: true };
  },
});