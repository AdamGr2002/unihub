import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { getConvexUser, ensureClubAdmin, getMembership } from "./utils";

export const createTask = mutation({
  args: {
    clubId: v.id("clubs"),
    title: v.string(),
    description: v.string(),
    assignedTo: v.optional(v.id("users")),
    dueDate: v.optional(v.number()),
    status: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done")
    ),
  },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    // Authorization: Club member (or admin) can create tasks
    const membership = await getMembership(ctx, user._id, args.clubId);
    if (!membership) throw new Error("User must be a club member to create tasks.");
    // Potentially restrict further by role if needed

    await ctx.db.insert("tasks", {
      ...args,
      createdBy: user._id,
      createdAt: Date.now(),
    });
    return { success: true };
  },
});

export const updateTask = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    assignedTo: v.optional(v.id("users")), // Use v.null() to unassign if schema allows
    dueDate: v.optional(v.number()),
    status: v.optional(v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done")
    )),
  },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found.");

    // Authorization: Creator, assignee, or club admin
    if (
      task.createdBy !== user._id &&
      !(task.assignedTo && task.assignedTo === user._id)
    ) {
      await ensureClubAdmin(ctx, user._id, task.clubId);
    }
    
    const { taskId, ...updates } = args;
    // Handle unassigning if assignedTo is explicitly passed as null
    // This requires schema to support v.union(v.id("users"), v.null()) for assignedTo
    // For now, if assignedTo is undefined in args, it's not updated.
    // If you want to allow unsetting, you'd need to handle `args.assignedTo === null`
    // and potentially change the schema for `assignedTo` to `v.union(v.id("users"), v.null())`.
    // For simplicity, the current optional means it only updates if a value is provided.

    if (Object.keys(updates).length === 0) {
        throw new Error("No updates provided for the task.");
    }

    await ctx.db.patch(taskId, updates);
    return { success: true };
  },
});

export const deleteTask = mutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const user = await getConvexUser(ctx);
    if (!user) throw new Error("User not authenticated.");

    const task = await ctx.db.get(args.taskId);
    if (!task) throw new Error("Task not found.");

    // Authorization: Creator or club admin
    if (task.createdBy !== user._id) {
        await ensureClubAdmin(ctx, user._id, task.clubId);
    }
    await ctx.db.delete(args.taskId);
    return { success: true };
  },
});