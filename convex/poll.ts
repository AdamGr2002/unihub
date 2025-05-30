import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getConvexUser, ensureClubAdmin, getMembership } from "./utils";

export const createPoll = mutation({
  args: {
    clubId: v.id("clubs"),
    question: v.string(),
    options: v.array(v.string()), // Array of option strings
    closesAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    // Authorization: Club member (or admin) can create polls
    const membership = await getMembership(ctx, user._id, args.clubId);
    if (!membership) throw new Error("User must be a club member to create polls.");
    // Potentially restrict further by role

    if (args.options.length < 2) {
      throw new Error("Poll must have at least two options.");
    }

    await ctx.db.insert("polls", {
      ...args,
      votes: [], // Initialize with empty votes
      createdBy: user._id,
    });
    return { success: true };
  },
});

export const voteOnPoll = mutation({
  args: {
    pollId: v.id("polls"),
    choiceIndex: v.number(), // Index of the chosen option
  },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    const poll = await ctx.db.get(args.pollId);
    if (!poll) throw new Error("Poll not found.");

    if (poll.closesAt && poll.closesAt < Date.now()) {
      throw new Error("Poll has closed.");
    }

    // Ensure user is a member of the club to vote
    const membership = await getMembership(ctx, user._id, poll.clubId);
    if (!membership) throw new Error("User must be a club member to vote.");

    if (args.choiceIndex < 0 || args.choiceIndex >= poll.options.length) {
      throw new Error("Invalid choice index.");
    }

    // Prevent duplicate voting by the same user
    const existingVote = poll.votes.find(vote => vote.userId===(user._id));
    if (existingVote) {
      // Option 1: Update existing vote
      const updatedVotes = poll.votes.map(vote =>
        vote.userId===(user._id) ? { userId: user._id, choiceIndex: args.choiceIndex } : vote
      );
      await ctx.db.patch(args.pollId, { votes: updatedVotes });
      // Option 2: Throw error
      // throw new Error("User has already voted on this poll.");
    } else {
      const updatedVotes = [...poll.votes, { userId: user._id, choiceIndex: args.choiceIndex }];
      await ctx.db.patch(args.pollId, { votes: updatedVotes });
    }
    return { success: true };
  },
});

export const deletePoll = mutation({
  args: { pollId: v.id("polls") },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");
    
    const poll = await ctx.db.get(args.pollId);
    if (!poll) throw new Error("Poll not found.");

    // Authorization: Creator or club admin
    if (poll.createdBy !== user._id) {
        await ensureClubAdmin(ctx, user._id, poll.clubId);
    }
    await ctx.db.delete(args.pollId);
    return { success: true };
  },
});